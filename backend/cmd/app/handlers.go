package main

import (
	"net/http"
)

func (app *application) healthcheckHandler(w http.ResponseWriter, r *http.Request) {
	app.writeJSON(w, envelope{"status": "ok"}, http.StatusOK)
}
