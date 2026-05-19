package main

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

func (app *application) routes() http.Handler {
	r := chi.NewRouter()

	r.NotFound(app.notFoundResponse)
	r.MethodNotAllowed(app.methodNotAllowedResponse)

	r.Use(middleware.Logger)
	r.Use(app.recoverPanic)
	r.Use(app.enableCORS)

	r.Get("/healthcheck", app.healthcheckHandler)

	r.Get("/feeds/status/stream", app.sseHandler)
	r.Post("/feeds", app.broadcastHandler)

	return r
}
