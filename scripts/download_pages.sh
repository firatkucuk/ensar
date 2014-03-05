#!/bin/bash

for volume in $(seq -f "%02g" 40 44)
do
    for page in $(seq -f "%04g" 1 800)
    do
        wget -q -O $volume$page.html http://tdvislamansiklopedisi.org/dia/ayrmetin.php?idno=$volume$page > /dev/null
    done
done
