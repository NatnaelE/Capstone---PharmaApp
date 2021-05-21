#!/usr/bin/env bash

##### Change this to your project directory #####
export PROJECT_DIR=/Users/Yousef/Desktop/Capstone---PharmaApp

# EC2 SSH Username
export EC2_USERNAME="yousef"

# Run main script
sh $PROJECT_DIR/scripts/deploy/backend/deploy.sh