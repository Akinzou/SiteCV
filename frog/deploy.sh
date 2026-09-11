#!/bin/sh
# Builds the frontend and ships it + the Frog server code to the Mikrus box
# over the `frog` SSH alias (~/.ssh/config), then hands off to
# remote-setup.sh to (re)start the service and keep the cron watchdog
# up to date. Never touches ~/site/.env on the server - that holds secrets
# and is created once by hand from .env.example.
set -eu

cd "$(dirname "$0")/.."

npm run build

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

# CV_WiktorJelen* is gitignored (local-only, never published) but Vite still
# copies it from public/ into dist/ during a local build - strip it back out
# so a build on this machine can't leak it, matching what a clean CI
# checkout would produce anyway.
tar -C dist -czf "$tmp/dist.tar.gz" --exclude='CV_WiktorJelen*' .
tar -C frog -czf "$tmp/server.tar.gz" --exclude=__pycache__ \
  server.py requirements.txt run.sh

ssh frog "mkdir -p ~/site/dist ~/site/logs"
scp "$tmp/dist.tar.gz" frog:~/site/dist.tar.gz
scp "$tmp/server.tar.gz" frog:~/site/server.tar.gz
scp frog/remote-setup.sh frog:~/site/remote-setup.sh

ssh frog "sh ~/site/remote-setup.sh"
