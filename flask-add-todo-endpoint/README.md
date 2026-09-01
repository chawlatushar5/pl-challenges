# Flask Todo API

A simple REST API for managing todos.

## Existing endpoints

- `GET /todos` — returns all todos
- `POST /todos` — creates a new todo (body: `{"title": "..."}`)

## Your task

Add a `GET /todos/<int:todo_id>` endpoint that:
- Returns the todo with the given ID as JSON
- Returns HTTP 404 if the ID doesn't exist

## Running tests

```
pip install -r requirements.txt
python -m pytest test_app.py -v
```
