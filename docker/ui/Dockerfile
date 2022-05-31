FROM node:alpine

WORKDIR /var/www/ui

COPY ./ui/package.json /var/www/ui/

RUN yarn install

COPY --chown=node:node ./ui /var/www/ui

RUN mkdir -p /var/www/ui/node_modules && chmod -R 777 /var/www/ui/node_modules
USER node

CMD yarn start
