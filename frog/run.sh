#!/bin/sh
# Runs the Frog server in the foreground - meant to be launched by deploy.sh
# (nohup'd) or by the cron watchdog it installs, not run interactively.
set -eu

cd "$(dirname "$0")"

set -a
[ -f .env ] && . ./.env
set +a

mkdir -p logs

exec ./venv/bin/uvicorn server:app --host :: --port 21532 --workers 1
