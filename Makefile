build:
	@go build -ldflags "-w" -a -o ./.bin/server .

run:: build
	@.bin/server
