#!/bin/sh
# Installed as a once-a-minute cron job (busybox crond has no @reboot, so this
# is also what brings the service back up after a reboot, usually within a
# minute of crond itself starting). Checks both ports run.sh starts; if
# either is unhealthy, kills anything left over and starts both fresh rather
# than trying to patch up just the dead one.
set -eu

cd ~/site

healthy() {
    curl -sf --max-time 3 "http://localhost:$1/health" >/dev/null 2>&1
}

if healthy 21532 && healthy 31532; then
    exit 0
fi

pkill -f "venv/bin/uvicorn server:app" 2>/dev/null || true
sleep 1
nohup ./run.sh </dev/null >>logs/app.log 2>&1 &
