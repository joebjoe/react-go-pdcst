package server

import (
	"net/http"
	"net/url"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

const (
	basePath                = "/api"
	requestHeaderNameAPIKey = "X-ListenAPI-Key"
)

var handlers = []HandleFunc{
	handlePing,
	handle("best_podcasts"),
	handle("podcasts/:id"),
	handle("typeahead"),
}

// Server for serving fromend SPA and for acting as middleware between client and the third-party api
type Server struct {
	engine  *gin.Engine
	client  *http.Client
	hostURL *url.URL
	apiKey  string
}

// New for initializing a Server instance
func New(clientHostAddress *url.URL, clientAPIKey string) *Server {
	e := gin.New()
	e.Use(
		gin.Logger(),
		static.Serve("/", static.LocalFile("./web", true)), //serve frontend
	)
	return &Server{
		engine:  e,
		client:  &http.Client{},
		hostURL: clientHostAddress,
		apiKey:  clientAPIKey,
	}
}

// Start registers all handlers and starts the gin engine
func (s *Server) Start() {
	grp := s.engine.Group(basePath)
	for _, handler := range handlers {
		handler(grp, s)
	}
	s.engine.Run()
}
