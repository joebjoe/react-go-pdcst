package server

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/joebjoe/podcast-app/internal/service"
)

// Handler ...
type Handler func(grp *gin.RouterGroup, s *service.Service)

// HandlePing ...
func handlePing(grp *gin.RouterGroup, s *service.Service) {
	grp.GET(formatHandlerPath("ping"), func(ctx *gin.Context) {
		resp, err := s.Ping(ctx)
		if isErred(ctx, err) {
			return
		}
		ctx.JSON(http.StatusOK, resp)
	})
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
func formatHandlerPath(path string) string {
	//ensure pathing is accurate regardless of what's passed at initialization(i.e. `foo`, `./bar`, `/baz`)
	return fmt.Sprintf("/%s", strings.TrimLeft(path, "./"))
}
