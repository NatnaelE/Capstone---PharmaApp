#!/usr/bin/env bash

# Local Directories
export DEPLOY_DIR=$PROJECT_DIR/scripts/deploy/backend
export SERVER_DIR=$PROJECT_DIR/server

echo -e "\n> Deploying Backend ..."

# Change to server directory
cd $SERVER_DIR
echo -e "> Working out of: " $(pwd) "\n"

# Copy src
sftp -r $EC2_USERNAME@ec2-54-212-108-32.us-west-2.compute.amazonaws.com:../public/backend \
  <<< "put ./src"

# Copy Docker and npm files
sftp $EC2_USERNAME@ec2-54-212-108-32.us-west-2.compute.amazonaws.com:../public/backend << EOF
  put .dockerignore
  put Dockerfile
  put docker-compose.yml
  put package-lock.json
  put package.json
EOF

# Fix permissions
ssh -tt $EC2_USERNAME@ec2-54-212-108-32.us-west-2.compute.amazonaws.com sudo chgrp -R wheel ../public/backend

echo -e "\n> Server files copied!\n"

# Run deploy commands in EC2
cd $DEPLOY_DIR
ssh -tt $EC2_USERNAME@ec2-54-212-108-32.us-west-2.compute.amazonaws.com < deploy-commands.sh

echo -e "\n> Deploy complete!"
