# Calculator

### Requirements
* yarn
* php
* composer
* symfony CLI

1. Clone the repository
2. In CLI, tape these following commands:
```shell
# API:
cd calculator/api 

composer install

# create database
symfony console d:d:c

# run migration
symfony console d:m:m

# And ... start a server
symfony server:start --port=8080 -d

# Check the endpoints in Postman: http://localhost:8080/api/
# An postman Collections json is available ("Calculator.postman_collection.json")


# UI:
cd calculator/ui 

yarn install

yarn start 
# check : http://localhost:3000
```


Enjoy !