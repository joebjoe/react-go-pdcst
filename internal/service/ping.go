package service

import (
	"context"
)

// PingResponse ...
type PingResponse struct {
	Message string `json:"message,omitempty"`
}

// Ping ...
func (s *Service) Ping(ctx context.Context) (*PingResponse, error) {
	return &PingResponse{
		Message: "Pong",
	}, nil
}
