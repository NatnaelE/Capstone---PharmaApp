#!/usr/bin/env bash

# Project Directory
export PROJECT_DIR=~/dev/Capstone---PharmaApp

# EC2 SSH Username
export EC2_USERNAME="ec2-user"

# Run main deploy script
$PROJECT_DIR/scripts/deploy/backend/deploy.sh