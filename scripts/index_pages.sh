#!/bin/bash

for f in *.html
do
    curl "http://localhost:8983/solr/update/extract?literal.id=$f&commit=true" -F "myfile=@$f"
done
