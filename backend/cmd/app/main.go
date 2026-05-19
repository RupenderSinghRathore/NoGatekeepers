package main

import (
	"os"
	"sync"
	"time"

	"github.com/charmbracelet/log"

	"github.com/joho/godotenv"
)

type application struct {
	logger *log.Logger
	port   int
	wg     sync.WaitGroup
	broker Broker
}

func main() {
	_ = godotenv.Load()

	app := application{}

	logger := log.New(os.Stderr)
	logger.SetTimeFormat(time.TimeOnly)
	logger.SetReportTimestamp(true)

	port, err := getPort()
	if err != nil {
		logger.Fatal(err)
	}

	app.logger = logger
	app.port = port
	app.broker = *NewBroker()

	app.serve()
}
