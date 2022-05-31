# calculator

Application de calculator.

## Création de l'environnement
### Requirements
* Git
* Docker
* Docker-compose

## Utilisation

- Cloner le repository git.

- Dans un terminal, taper la commande suivante :

```shell
cd calculator
docker-compose up -d --build
```
Une fois la commande exécutée, si tout s'est bien passé, 3 conteneurs sont montés :
* Nginx
* php_fpm
* ui


- Puis lancer l'API en executant la commande suivante :
```shell
docker exec -it calculator-php_fpm-1 /bin/bash -c "composer install"
```


Pour accéder au front : http://localhost:3000

Pour accéder au Back: POST http://localhost:8080/api/calcul

## Tests

POur lancer les tests unitaire, taper la commande:

```shell
docker exec -it calculator-php_fpm-1 /bin/bash -c "php bin/phpunit"
```
