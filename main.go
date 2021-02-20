package main

import (
	"fmt"
	"net/url"
	"os"

	"github.com/joebjoe/podcast-app/server"
	"github.com/joho/godotenv"
)

const (
	envListenAPIKey     = "LISTEN_API_KEY"
	envListenAPIBaseURL = "LISTEN_API_BASE_URL"
	envGinMode          = "GIN_MODE"
)

func missingConfigErr(varName string) error {
	return fmt.Errorf("missing config value: %s", varName)
}

var (
	listenAPIKey     string
	listenAPIBaseURL *url.URL
)

func main() {
	parseConfig()
	server.New(listenAPIBaseURL, listenAPIKey).Start()
}

func parseConfig() {
	if os.Getenv(envGinMode) != "release" {
		if err := godotenv.Load(".env.local"); err != nil {
			panic(fmt.Errorf("error loading config file: %v", err))
		}
	}

	var found bool
	listenAPIKey, found = os.LookupEnv(envListenAPIKey)
	if !found || listenAPIKey == "" {
		panic(missingConfigErr(envListenAPIKey))
	}

	rawURL, found := os.LookupEnv(envListenAPIBaseURL)
	if !found || rawURL == "" {
		panic(missingConfigErr(envListenAPIBaseURL))
	}

	var err error
	listenAPIBaseURL, err = url.Parse(rawURL)
	if err != nil {
		panic(fmt.Errorf("error parsing api host: %v", err))
	}
}
