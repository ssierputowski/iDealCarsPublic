#!/usr/bin/env bash

# Title: Restore
# Author: Jerrod Mathis
# Description: This script is used by the MongoDB container to restore the current directory

# Execute restore in the background after 5 seconds
sleep 5 && mongorestore /current &

# Keep Mongo running in the foreground or the container will shut off
docker-entrypoint.sh mongod 