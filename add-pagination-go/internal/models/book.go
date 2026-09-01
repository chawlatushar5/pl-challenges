package models

type Book struct {
	ID     string `json:"id"`
	Title  string `json:"title"`
	Author string `json:"author"`
	Year   int    `json:"year"`
	Genre  string `json:"genre"`
}

type PaginatedBooks struct {
	Data  []Book `json:"data"`
	Page  int    `json:"page"`
	Limit int    `json:"limit"`
	Total int    `json:"total"`
	Pages int    `json:"pages"`
}
