# Simple Makefile for a Go project

# Build the application
all: build test

build:
	@echo "Building..."
	
	
	@go build -o ./bin/app ./cmd/app/

# Run the application
run:
	@go run ./cmd/api/

# Test the application
test:
	@echo "Testing..."
	@go test ./... -v

# Clean the binary
clean:
	@echo "Cleaning..."
	@rm -rf ./bin

# Live Reload
watch:
	@if command -v air > /dev/null; then \
            air; \
            echo "Watching...";\
        else \
			echo "You have not installed air. Exiting..."; \
        fi

.PHONY: all build run test clean watch
