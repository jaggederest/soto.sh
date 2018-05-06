#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

docker-compose \
--file $DIR/docker-compose.yml \
-p spsoto-dev \
up --remove-orphans

docker-compose \
--file $DIR/docker-compose.yml \
-p spsoto-dev \
down --remove-orphans
