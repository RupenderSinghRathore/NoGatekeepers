package main

import (
	"fmt"
	"net/http"
	"sync"
)

type Broker struct {
	mu      sync.Mutex
	clients map[chan any]bool
}

func NewBroker() *Broker {
	return &Broker{
		clients: make(map[chan any]bool),
	}
}

func (b *Broker) Listen() chan any {
	ch := make(chan any, 5)

	b.mu.Lock()
	b.clients[ch] = true
	b.mu.Unlock()

	return ch
}

func (b *Broker) Remove(ch chan any) {
	b.mu.Lock()
	delete(b.clients, ch)
	close(ch)
	b.mu.Unlock()
}

func (b *Broker) Broadcast(msg string) {
	b.mu.Lock()
	defer b.mu.Unlock()

	for ch := range b.clients {
		select {
		case ch <- msg:
		default:
			// client is too slow
			delete(b.clients, ch)
			close(ch)
		}
	}
}

func (app *application) sseHandler(w http.ResponseWriter, r *http.Request) {
	// SSE headers
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")

	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "Streaming unsupported", http.StatusInternalServerError)
		return
	}

	client := app.broker.Listen()
	defer app.broker.Remove(client)

	ctx := r.Context()

	for {
		select {
		case <-ctx.Done():
			return

		case msg, ok := <-client:
			if !ok {
				return
			}

			fmt.Fprintf(w, "data: %s\n\n", msg)
			flusher.Flush()
		}
	}
}

func (app *application) broadcastHandler(w http.ResponseWriter, r *http.Request) {
	msg := r.URL.Query().Get("msg")

	app.broker.Broadcast(msg)

	fmt.Fprintf(w, "sent: %s\n", msg)
}
