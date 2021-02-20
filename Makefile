build:
	@go build -ldflags "-w" -a -o ./.bin/server ./cmd

run:: build
	@.bin/server
