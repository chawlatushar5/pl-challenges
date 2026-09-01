#!/bin/bash
# Starts the Postgres cluster baked into the sandbox's shared E2B template
# (see helper-scripts/build-real-env-template.mjs) and loads schema + seed
# data into a fresh "ledger" database — idempotent, since a resumed sandbox
# (E2B pauses preserve full VM memory, so the daemon likely never actually
# stopped) or a re-run of this same script should not re-seed 5M rows twice.
set -euo pipefail

CLUSTER_VERSION=$(sudo pg_lsclusters | awk 'NR==2 {print $1}')

if ! sudo pg_lsclusters | grep -q online; then
  sudo pg_ctlcluster "$CLUSTER_VERSION" main start
fi

for i in $(seq 1 30); do
  if sudo -u postgres psql -c '\q' 2>/dev/null; then break; fi
  sleep 1
done

sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';" >/dev/null

if ! sudo -u postgres psql -lqt | cut -d '|' -f 1 | grep -qw ledger; then
  sudo -u postgres createdb ledger
  # `-f <path>` has postgres itself open the file, which fails since the
  # postgres OS user can't traverse into /home/user (the sandbox user's
  # home, owned by "user" with no other-read). Piping via stdin instead
  # means the calling shell (running as "user", which owns these files)
  # opens them, sidestepping that permission entirely.
  sudo -u postgres psql -d ledger < db/schema.sql
  sudo -u postgres psql -d ledger < db/seed.sql
fi
