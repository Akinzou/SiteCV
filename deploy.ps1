#!/usr/bin/env pwsh
# Deploy SiteCV to VPS

$ErrorActionPreference = "Stop"

$VPS_HOST = "vps-8dccf9fd.vps.ovh.net"
$VPS_PORT = "23824"
$VPS_USER = "wiktor"
$IMAGE_NAME = "sitecv"
$CONTAINER_NAME = "sitecv"
$TAR_FILE = "$env:TEMP\sitecv.tar"

Write-Host "=== Building Docker image ===" -ForegroundColor Cyan
docker build -t $IMAGE_NAME .
if ($LASTEXITCODE -ne 0) { throw "Build failed" }

Write-Host "=== Exporting image ===" -ForegroundColor Cyan
docker save $IMAGE_NAME -o $TAR_FILE
if ($LASTEXITCODE -ne 0) { throw "Export failed" }

Write-Host "=== Uploading to VPS ===" -ForegroundColor Cyan
scp -P $VPS_PORT $TAR_FILE "${VPS_USER}@${VPS_HOST}:~/"
if ($LASTEXITCODE -ne 0) { throw "Upload failed" }

Write-Host "=== Updating container on VPS ===" -ForegroundColor Cyan
ssh -p $VPS_PORT "${VPS_USER}@${VPS_HOST}" @"
    docker load -i ~/sitecv.tar && \
    docker stop $CONTAINER_NAME 2>/dev/null; \
    docker rm $CONTAINER_NAME 2>/dev/null; \
    docker run -d -p 8080:80 --name $CONTAINER_NAME --restart unless-stopped $IMAGE_NAME && \
    rm ~/sitecv.tar && \
    echo 'Container updated successfully!'
"@
if ($LASTEXITCODE -ne 0) { throw "Deploy failed" }

Write-Host "=== Cleaning up ===" -ForegroundColor Cyan
Remove-Item $TAR_FILE -ErrorAction SilentlyContinue

Write-Host "=== Done! ===" -ForegroundColor Green
Write-Host "Site available at: https://yelon.pro" -ForegroundColor Green
