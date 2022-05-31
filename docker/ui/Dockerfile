FROM node:current-alpine3.14

USER node

COPY --chown=node:node ./ui /var/www/ui
WORKDIR /var/www/ui

COPY ./ui/package.json /var/www/ui/

RUN yarn install

RUN yarn run build
CMD yarn start
