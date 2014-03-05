#!/bin/bash

curl "http://localhost:8983/solr/update?stream.body=<delete><query>*:*</query></delete>"
curl "http://localhost:8983/solr/update?stream.body=<commit/>"
