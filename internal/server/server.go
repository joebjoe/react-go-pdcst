package server

import (
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/joebjoe/podcast-app/internal/service"
)

const basePath = "/api"

var handlers = []Handler{
	handlePing,
}

// Server for serving front end and communicating with the api
type Server struct {
	engine *gin.Engine
}

// New inializes a new server instance...
func New(svc *service.Service) *Server {
	e := gin.New()
	e.Use(
		gin.Logger(),
		static.Serve("/", static.LocalFile("./web", true)),
	)
	grp := e.Group(basePath)
	for _, handler := range handlers {
		handler(grp, svc)
	}
	return &Server{engine: e}
}

// Start starts the server
func (s *Server) Start() {
	s.engine.Run()
}
