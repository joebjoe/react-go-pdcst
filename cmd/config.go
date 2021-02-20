package main

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

// env variable names
const (
	envListenAPIKey     = "LISTEN_API_KEY"
	envListenAPIBaseURL = "LISTEN_API_BASE_URL"
	envGinMode          = "GIN_MODE"
)

var (
	listenAPIKey     string
	listenAPIBaseURL string
	ginMode          string
)

func parseConfig() {
	if ginMode = os.Getenv(envGinMode); ginMode != "release" {
		if err := godotenv.Load(".env.local"); err != nil {
			panic(fmt.Errorf("error loading config file: %v", err))
		}
	}

	listenAPIKey = os.Getenv(envListenAPIKey)
	listenAPIBaseURL = os.Getenv(envListenAPIBaseURL)
}
