import os

REPORTS_DIR = os.path.join(os.path.dirname(__file__), "reports")


def read_report(filename):
    path = os.path.join(REPORTS_DIR, filename)
    with open(path) as f:
        return f.read()
