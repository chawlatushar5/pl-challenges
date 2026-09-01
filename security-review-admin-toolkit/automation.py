import os


def run_backup(filename):
    os.system(f"tar -czf backup.tar.gz {filename}")
