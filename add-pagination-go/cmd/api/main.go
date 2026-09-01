package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/promptleet/gobooks/internal/handlers"
	"github.com/promptleet/gobooks/internal/models"
	"github.com/promptleet/gobooks/internal/repository"
	"github.com/promptleet/gobooks/internal/router"
)

func main() {
	// Seed with sample books
	books := make([]models.Book, 100)
	for i := range books {
		books[i] = models.Book{
			ID:     fmt.Sprintf("%d", i+1),
			Title:  fmt.Sprintf("Book %d", i+1),
			Author: fmt.Sprintf("Author %d", (i%10)+1),
			Year:   2000 + (i % 24),
			Genre:  []string{"Fiction", "Non-Fiction", "Science", "History"}[i%4],
		}
	}

	repo := repository.NewInMemoryBookRepository(books)
	booksHandler := handlers.NewBooksHandler(repo)
	mux := router.Setup(booksHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	fmt.Printf("GoBooks running on :%s\n", port)
	http.ListenAndServe(":"+port, mux)
}
