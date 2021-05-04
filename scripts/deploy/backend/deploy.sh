#!/usr/bin/env bash

# Project directory
export PROJECT_DIR=~/dev/Capstone---PharmaApp

# Deploy directory
export DEPLOY_DIR=$PROJECT_DIR/scripts/deploy/backend

echo -e "\n> Deploying Backend ..."

# Change to server directory
cd $PROJECT_DIR/server
echo -e "> Working directory: " $(pwd) "\n"

# Delete node_modules
# rm -r ./node_modules

# Copy /server directory into EC2
# sftp -r \
#   ec2-user@ec2-54-212-108-32.us-west-2.compute.amazonaws.com: \
#   <<< "put ./server"

# Copy src
sftp -r \
  ec2-user@ec2-54-212-108-32.us-west-2.compute.amazonaws.com:server \
  <<< "put ./src"

# Copy Docker and npm files
sftp ec2-user@ec2-54-212-108-32.us-west-2.compute.amazonaws.com:server << EOF
  put .dockerignore
  put Dockerfile
  put docker-compose.yml
  put package-lock.json
  put package.json
EOF

echo -e "\n> Server files copied!\n"

# Run deploy commands in EC2
cd $DEPLOY_DIR
ssh -tt ec2-user@ec2-54-212-108-32.us-west-2.compute.amazonaws.com < deploy-commands.sh

echo -e "\n> Deploy complete!"
