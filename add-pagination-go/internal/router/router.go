package router

import (
	"net/http"

	"github.com/promptleet/gobooks/internal/handlers"
)

func Setup(booksHandler *handlers.BooksHandler) http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /books", booksHandler.ListBooks)
	mux.HandleFunc("GET /books/{id}", booksHandler.GetBook)
	mux.HandleFunc("GET /health", handlers.HealthHandler)
	return mux
}
