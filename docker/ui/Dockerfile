FROM node:current-alpine3.14

# this is a development Dockerfile
# and is not intended for production use
WORKDIR /var/www/ui

COPY ./../../ui/package.json /var/www/ui/

RUN yarn install

COPY . /var/www/ui

RUN chown -R node node_modules
USER node

# this what make hot reloading works
# because you are starting your project
# in the same way you running it locally
CMD yarn start
