# calculator

Application de calculator.

## Création de l'environnement


## 1ere cas d'utilidation: SANS DOCKER
### Requirements
* yarn
* php
* composer
* symfony CLI

1. Cloner le repository git dans un serveur web.
2. Dans un terminal, taper les commandes suivantes:
```shell
# API:
cd calculator/api 
composer install
symfony server:start --port=8080 -d
# Acces Back: POST http://localhost:8080/api/calcul
# exemple: curl -X POST -H "Content-Type: application/json" -d '{"input": "1+2"}' http://localhost:8080/api/calcul

# UI:
cd calculator/ui 
yarn install
yarn watch 
# voir : http://localhost:3000
```
Pour accéder au Back: POST http://localhost:8080/api/calcul
Pour accéder au front : http://localhost:3000

## 2e cas d'utilisation : AVEC DOCKER

1. Cloner le repository git

2. Dans un terminal, taper la commandes suivantes:

```shell
cd calculator
docker-compose up -d --build
```
Une fois la commande exécutée, si tout s'est bien passé, 3 conteneurs sont montés :
* Nginx
* php_fpm
* ui

3. Lancer l'API en executant la commande suivante :
```shell
docker exec -it calculator_php_fpm_1 /bin/bash -c "composer install"
```
Pour accéder au Back: POST http://localhost:8080/api/calcul


4. Lancer le Front en executant les commandes suivantes :
```shell
 cd ui
 yarn install
 yarn start
```
Pour accéder au front : http://localhost:3000

## Tests

Pour lancer les tests unitaire, taper la commande:

```shell
docker exec -it calculator_php_fpm_1 /bin/bash -c "php bin/phpunit"
```
