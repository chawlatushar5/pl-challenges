import sqlite3


def _get_connection():
    conn = sqlite3.connect(":memory:")
    conn.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)")
    conn.executemany(
        "INSERT INTO users (name, email) VALUES (?, ?)",
        [
            ("Alice Chen", "alice@example.com"),
            ("Bob Diaz", "bob@example.com"),
            ("Carol Evans", "carol@example.com"),
        ],
    )
    conn.commit()
    return conn


def search_users(name):
    conn = _get_connection()
    query = f"SELECT id, name, email FROM users WHERE name = '{name}'"
    cursor = conn.execute(query)
    rows = cursor.fetchall()
    conn.close()
    return [{"id": r[0], "name": r[1], "email": r[2]} for r in rows]
