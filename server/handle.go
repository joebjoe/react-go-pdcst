package server

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"

	"github.com/gin-gonic/gin"
)

// HandleFunc for registering an action to perform with the given router group
type HandleFunc func(grp *gin.RouterGroup, s *Server)

func handlePing(grp *gin.RouterGroup, s *Server) {
	grp.GET(formattedHandlerPath("ping"), func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "Pong",
		})
	})
}

func handle(path string) HandleFunc {
	path = formattedHandlerPath(path)
	return func(grp *gin.RouterGroup, s *Server) {
		grp.GET(path, func(ctx *gin.Context) {
			resp, err := s.doRequest(ctx.Request.URL)
			if isErred(ctx, err) {
				return
			}
			ctx.JSON(http.StatusOK, resp)
		})
	}
}

func handleGetFollowing(grp *gin.RouterGroup, s *Server) {
	grp.GET(formattedHandlerPath("following"), func(ctx *gin.Context) {
		podcasts := []interface{}{}
		defer func() {
			ctx.JSON(http.StatusOK, gin.H{
				"podcasts": podcasts,
			})
		}()

		qsPIDs, found := ctx.GetQuery("pids")
		if !found {
			return
		}
		pids := strings.Split(qsPIDs, ",")
		for _, pid := range pids {
			u := *ctx.Request.URL
			u.Path = fmt.Sprintf("/podcasts/%s", pid)
			pdcst, err := s.doRequest(&u)
			if isErred(ctx, err) {
				return
			}
			podcasts = append(podcasts, pdcst)
		}
	})
}

func (s *Server) doRequest(u *url.URL) (interface{}, error) {
	//dereferencing to not mutate the host address
	reqURL := *s.hostURL
	reqURL.Path = reqURL.Path + strings.TrimPrefix(u.Path, basePath)
	reqURL.RawQuery = u.RawQuery
	req, err := http.NewRequest(http.MethodGet, reqURL.String(), nil)
	if err != nil {
		return nil, fmt.Errorf("error generating request: %v", err)
	}
	req.Header.Add(requestHeaderNameAPIKey, s.apiKey)

	resp, err := s.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("error making request: %v", err)
	}
	var b []byte
	if resp != nil {
		b, err = ioutil.ReadAll(resp.Body)
		resp.Body.Close()
	}

	if len(b) == 0 || err != nil || resp.StatusCode > 299 {
		return nil, fmt.Errorf("error making request: %v\n\nRequest: %+v\n\nStatus: %s\n\nResponse: %v", err, req, resp.Status, string(b))
	}

	var response interface{}
	if err = json.Unmarshal(b, &response); err != nil {
		return nil, fmt.Errorf("error unmarshaling response: %v", err)
	}
	return response, nil
}

func isErred(ctx *gin.Context, err error) bool {
	if err == nil {
		return false
	}
	ctx.AbortWithStatusJSON(200, gin.H{
		"error": err.Error(),
	})
	ctx.Error(err)
	ctx.Abort()
	return true
}

func formattedHandlerPath(path string) string {
	//ensure pathing is accurate regardless of what's passed at initialization(i.e. `foo`, `./bar`, `/baz`)
	return fmt.Sprintf("/%s", strings.ToLower(strings.TrimLeft(path, "./")))
}
