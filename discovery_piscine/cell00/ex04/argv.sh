#!/bin/bash

if [ $# -eq 0 ]; then
    echo "No arguments supplied"
    exit 1
fi
round=0
max_round=3
for arg in "$@"; do 
   echo "$arg"
   ((round++))
   if [ "$round" -eq "$max_round" ]; then
	break
   fi

done

