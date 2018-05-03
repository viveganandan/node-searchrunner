# node-searchrunner

Attempting to solve problem https://github.com/Hipmunk/hipproblems/tree/master/searchrunner

The solution is contained within a docker container.  It is a node js app using redis in the backend to cache the results with an expiration of 60 seconds.  The node app is behind nginx, which helps us load balance requests.  You can specify how many upstream servers nginx should load balance to using the --scale option when executing `docker-compose`.

## Requirements
1. docker
2. docker-compose
3. `python -m searchrunner.scraperapi`

## Starting searchrunner

`docker-compose up --scale searchrunner=3`

Go to http://localhost:8000/flights/search

## Stopping searchrunner

`docker-compose down`
