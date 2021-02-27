package server

import (
	"net/http"
	"net/url"
	"time"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

const (
	basePath                = "/api/v1"
	requestHeaderNameAPIKey = "X-ListenAPI-Key"
	clientTimeout           = time.Second * 15
)

var handlers = []HandleFunc{
	handlePing,
	handle("best_podcasts"),
	handle("podcasts/:id"),
	handle("typeahead"),
	handle("search"),
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
	e.NoRoute(func(ctx *gin.Context) {
		//serve up the index page and let React determine whether its a valid route our not
		ctx.File("./web")
	})
	return &Server{
		engine:  e,
		client:  &http.Client{Timeout: clientTimeout},
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
