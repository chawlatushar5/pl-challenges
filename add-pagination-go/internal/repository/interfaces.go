package repository

import (
	"context"

	"github.com/promptleet/gobooks/internal/models"
)

type BookRepository interface {
	GetAll(ctx context.Context) ([]models.Book, error)
	GetPage(ctx context.Context, page, limit int) ([]models.Book, int, error)
	GetByID(ctx context.Context, id string) (*models.Book, error)
}
