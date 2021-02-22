package server

import (
	"fmt"
	"strings"
)

func formattedHandlerPath(path string) string {
	//ensure pathing is accurate regardless of what's passed at initialization(i.e. `foo`, `./bar`, `/baz`)
	return fmt.Sprintf("/%s", strings.ToLower(strings.TrimLeft(path, "./")))
}
