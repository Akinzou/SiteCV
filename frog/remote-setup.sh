#!/bin/sh
# Runs ON the Frog server after deploy.sh has uploaded dist.tar.gz and
# server.tar.gz into ~/site. Unpacks them, (re)installs deps, restarts the
# service, and makes sure the cron watchdog is installed. Never touches .env.
set -eu

cd ~/site

rm -rf dist
mkdir dist
tar -xzf dist.tar.gz -C dist
rm dist.tar.gz
tar -xzf server.tar.gz
rm server.tar.gz
chmod +x run.sh

[ -d venv ] || python3 -m venv venv
./venv/bin/pip install --quiet -r requirements.txt

pkill -f "venv/bin/uvicorn server:app" 2>/dev/null || true
sleep 1
nohup ./run.sh >>logs/app.log 2>&1 &

marker="uvicorn server:app"
watchdog_line='* * * * * pgrep -f "venv/bin/uvicorn server:app" >/dev/null || (cd ~/site && ./run.sh >>logs/watchdog.log 2>&1 &)'
{ crontab -l 2>/dev/null | grep -vF "$marker" || true; echo "$watchdog_line"; } | crontab -

# The box is a single weak vCPU under memory pressure - starting the
# interpreter and importing fastapi/resend/httpx can take a few seconds,
# so poll instead of trusting one fixed sleep.
ok=0
for _ in 1 2 3 4 5 6 7 8 9 10; do
    if curl -sf http://localhost:21532/health >/dev/null; then
        ok=1
        break
    fi
    sleep 1
done

if [ "$ok" = 1 ]; then
    echo "-> deployed OK"
else
    echo "-> health check FAILED, see ~/site/logs/app.log"
fi
