package server

import (
	"fmt"
	"io/ioutil"
	"net/http"
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
			resp, err := s.doRequest(ctx)
			if isErred(ctx, err) {
				return
			}
			ctx.JSON(http.StatusOK, string(resp))
		})
	}
}

func (s *Server) doRequest(ctx *gin.Context) ([]byte, error) {
	//dereferencing to not mutate the host address
	reqURL := *s.hostURL
	reqURL.Path = reqURL.Path + strings.TrimPrefix(ctx.Request.URL.Path, basePath)
	reqURL.RawQuery = ctx.Request.URL.RawQuery
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
	return b, nil
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
