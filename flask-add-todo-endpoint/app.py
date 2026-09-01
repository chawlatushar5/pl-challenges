from flask import Flask, jsonify, request, abort

app = Flask(__name__)

todos = {
    1: {"id": 1, "title": "Buy groceries", "done": False},
    2: {"id": 2, "title": "Read a book", "done": True},
    3: {"id": 3, "title": "Write tests", "done": False},
}

@app.route("/todos", methods=["GET"])
def get_todos():
    return jsonify(list(todos.values()))

@app.route("/todos", methods=["POST"])
def create_todo():
    data = request.get_json()
    if not data or "title" not in data:
        abort(400)
    new_id = max(todos.keys()) + 1
    todo = {"id": new_id, "title": data["title"], "done": False}
    todos[new_id] = todo
    return jsonify(todo), 201

# TODO: Add GET /todos/<int:todo_id> endpoint here

if __name__ == "__main__":
    app.run(debug=True)
