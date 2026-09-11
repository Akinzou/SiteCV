#!/bin/sh
# Runs the Frog server in the foreground - meant to be launched by
# remote-setup.sh (nohup'd) or by the cron watchdog, not interactively.
#
# Two processes, two of our three allocated ports:
#   21532  --host ::        the real target for the eventual Cloudflare AAAA
#                            record (native external IPv6 binds fine on a
#                            dual-stack socket).
#   31532  --host 0.0.0.0   confirmed by testing that this box's dual-stack
#                            "::" socket does NOT receive traffic arriving
#                            through the shared-IPv4 NAT path (a plain IPv4
#                            bind on the same NAT path works immediately) -
#                            so this is the one reachable right now via
#                            https://frog01-31532.wykr.es/ for testing
#                            without waiting on DNS/Cloudflare.
set -eu

cd "$(dirname "$0")"

set -a
[ -f .env ] && . ./.env
set +a

mkdir -p logs

./venv/bin/uvicorn server:app --host :: --port 21532 --workers 1 &
exec ./venv/bin/uvicorn server:app --host 0.0.0.0 --port 31532 --workers 1
