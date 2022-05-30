# calculator

Application de calculator.

## Création de l'environnement
### Requirements
* Git
* Docker
* Docker-compose

## Utilisation

Cloner le repository git.

Dans un terminal, aller dans le dossier cloné et taper la commande suivante :

```shell
cd calculator
docker-compose up -d 
```

Une fois la commande exécutée, si tout s'est bien passé, 3 conteneurs sont montés :
* Nginx
* php_fpm
* ui

Pour accéder au front : http://localhost:3000

Pour accéder au Back (via Postman): http://localhost:8080

### Détails des conteneurs
#### calculator_nginx
Serveur web.

Pour les logs :
```shell
docker logs -f calculator-nginx-1
```
### calculator_php_fpm
Serveur applicatif php

Pour les logs php :
```shell
docker logs -f calculator-php_fpm-1
```
### calculator_ui
Serveur applicatif php

Pour les logs php :
```shell
docker logs -f calculator-ui-1
```

Pour les logs applicatif :
```shell
tail -f var/logs/*
```


### Destruction des containers
Pour détruire les containers, ouvrir un terminal. Aller dans le dossier du repo et taper la commande suivante

```shell
docker-compose down -v
```
