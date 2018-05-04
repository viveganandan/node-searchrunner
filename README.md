# node-searchrunner

Attempting to solve problem https://github.com/Hipmunk/hipproblems/tree/master/searchrunner

The solution is contained within a docker container.  It is a node js app with varnish cache operating as both a front-end cache and a load balancer.  Varnish load balances between 3 node containers.

## Requirements
1. docker
2. docker-compose
3. `python -m searchrunner.scraperapi`

## Starting searchrunner

`docker-compose up`

Go to http://localhost:8000/flights/search

## Stopping searchrunner

`docker-compose down`
