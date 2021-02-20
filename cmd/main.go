package main

import (
	"github.com/joebjoe/podcast-app/internal/server"
	"github.com/joebjoe/podcast-app/internal/service"
)

func main() {
	parseConfig()

	svc := service.New()
	srvr := server.New(svc)
	srvr.Start()
}
