# calculator

Application de calculator.

## Création de l'environnement
### Requirements
* Git
* Docker
* Docker-compose

## Utilisation

Cloner le repository git.

Dans un terminal, taper la commande suivante :

```shell
cd calculator
docker-compose up -d --build

```

Une fois la commande exécutée, si tout s'est bien passé, 3 conteneurs sont montés :
* Nginx
* php_fpm
* ui

Pour accéder au front : http://localhost:3000

Pour accéder au Back: POST http://localhost:8080/api/calcul
