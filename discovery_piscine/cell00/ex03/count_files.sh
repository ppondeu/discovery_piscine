#!/bin/bash

count=$(find . -maxdepth 1 -type f | wc -l | xargs echo -n)
echo "$count"

