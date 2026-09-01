package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/promptleet/gobooks/internal/repository"
)

type BooksHandler struct {
	repo repository.BookRepository
}

func NewBooksHandler(repo repository.BookRepository) *BooksHandler {
	return &BooksHandler{repo: repo}
}

// ListBooks returns all books.
// TODO: Add ?page and ?limit query parameter support.
//   - Default: page=1, limit=20
//   - Cap limit at 100
//   - Return 400 for invalid (non-positive, non-integer) values
//   - Response shape: { data: Book[], page: int, limit: int, total: int, pages: int }
func (h *BooksHandler) ListBooks(w http.ResponseWriter, r *http.Request) {
	books, err := h.repo.GetAll(r.Context())
	if err != nil {
		http.Error(w, "failed to fetch books", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(books)
}

func (h *BooksHandler) GetBook(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	book, err := h.repo.GetByID(r.Context(), id)
	if err != nil {
		http.Error(w, "not found", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(book)
}
