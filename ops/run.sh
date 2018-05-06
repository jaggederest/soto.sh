#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
set -e

docker-compose \
--file $DIR/docker-compose.yml \
-p spsoto-dev \
run --rm "$@"
