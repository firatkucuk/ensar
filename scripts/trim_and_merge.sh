#!/bin/bash

for f in *.html
do
    echo "||" $f "||" >> all.txt
    ./trim_page.py $f >> all.txt
done
