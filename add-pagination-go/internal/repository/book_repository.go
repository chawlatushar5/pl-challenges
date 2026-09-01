package repository

import (
	"context"
	"fmt"

	"github.com/promptleet/gobooks/internal/models"
)

type inMemoryBookRepository struct {
	books []models.Book
}

func NewInMemoryBookRepository(books []models.Book) BookRepository {
	return &inMemoryBookRepository{books: books}
}

func (r *inMemoryBookRepository) GetAll(ctx context.Context) ([]models.Book, error) {
	return r.books, nil
}

// GetPage returns a page of books and the total count.
// page is 1-indexed. limit is the max number of books per page.
func (r *inMemoryBookRepository) GetPage(ctx context.Context, page, limit int) ([]models.Book, int, error) {
	total := len(r.books)
	start := (page - 1) * limit
	if start >= total {
		return []models.Book{}, total, nil
	}
	end := start + limit
	if end > total {
		end = total
	}
	return r.books[start:end], total, nil
}

func (r *inMemoryBookRepository) GetByID(ctx context.Context, id string) (*models.Book, error) {
	for _, b := range r.books {
		if b.ID == id {
			return &b, nil
		}
	}
	return nil, fmt.Errorf("book %s not found", id)
}
