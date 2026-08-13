#!/bin/bash

echo "========================================"
echo "Deploying IT Change Register"
echo "========================================"

echo "Building frontend..."
cd ~/Projects/IT-Change-Register/frontend || exit 1
npm run build || exit 1

echo "Building backend..."
cd ~/Projects/IT-Change-Register/backend || exit 1
mvn clean package || exit 1

echo "Restarting Spring Boot service..."
sudo systemctl restart it-register

echo "Checking service status..."
sudo systemctl --no-pager status it-register

echo "========================================"
echo "Deployment completed successfully!"
echo "========================================"
