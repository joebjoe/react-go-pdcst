SERVER_BIN=$(GOBIN)/pdcst-server
build:
	@go build -ldflags "-w" -a -o $(SERVER_BIN) .

run:: build
	@$(SERVER_BIN)
