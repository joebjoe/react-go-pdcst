package server

import (
	"fmt"
	"regexp"
	"strings"
)

//Route ...
//TODO better documentation on why this was the way we are registering frontend routes
type Route struct {
	Name         string `json:"name,omitempty"`
	Path         string `json:"path,omitempty"`
	IsNavigation bool   `json:"is_navigation,omitempty"`
}

type routeOption func(*Route)

func withPathOverride(path string) routeOption {
	return func(r *Route) {
		r.Path = strings.ToLower(path)
	}
}

func isNavRoute() routeOption {
	return func(r *Route) {
		r.IsNavigation = true
	}
}

var (
	registeredRoutes  []*Route
	isRegisteredRoute *regexp.Regexp
)

func init() {
	registeredRoutes = append(registeredRoutes,
		newRoute("Explore", withPathOverride(""), isNavRoute()),
		newRoute("Library", isNavRoute()),
		newRoute("Podcast", withPathOverride("podcast/:id")),
		newRoute("Episode", withPathOverride("episode/:id")),
		newRoute("About", isNavRoute()),
	)

	paths := make([]string, len(registeredRoutes))
	for i, r := range registeredRoutes {
		paths[i] = strings.Split(strings.TrimLeft(r.Path, "/"), "/")[0]
	}
	isRegisteredRoute = regexp.MustCompile(fmt.Sprintf(`(?i)^\/(%s)`, strings.Join(paths, ")|(")))
}

func newRoute(name string, opts ...routeOption) *Route {
	r := &Route{
		Name: name,
		Path: formattedHandlerPath(name),
	}
	for _, opt := range opts {
		opt(r)
	}
	return r
}
