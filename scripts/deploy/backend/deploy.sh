#!/usr/bin/env bash

# Project directory
export PROJECT_DIR=~/dev/Capstone---PharmaApp

# Deploy directory
export DEPLOY_DIR=$PROJECT_DIR/scripts/deploy/sequelize

echo -e "\n> Deploying Backend ..."

cd $PROJECT_DIR
echo -e "> Working directory: " $(pwd) "\n"

# Remove old
# ssh -tt ec2-user@ec2-54-212-108-32.us-west-2.compute.amazonaws.com rm -r postgres

# Delete node_modules
rm -r $PROJECT_DIR/server/node_modules
rm -r $PROJECT_DIR/server/src/node_modules

# Copy /server directory into EC2
sftp -r \
  ec2-user@ec2-54-212-108-32.us-west-2.compute.amazonaws.com: \
  <<< "put ./server"

echo -e "\n> Server files copied!\n"

# Run deploy commands in EC2
cd $DEPLOY_DIR
ssh -tt ec2-user@ec2-54-212-108-32.us-west-2.compute.amazonaws.com < deploy-commands.sh

echo -e "\n> Deploy complete!"
