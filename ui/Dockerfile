FROM node:12-alpine as build

RUN mkdir /ui && chown -R node:node /ui

WORKDIR /ui

COPY package*.json /ui/

USER node

RUN yarn

COPY --chown=node:node . /ui/

RUN yarn build

FROM nginx as release

RUN rm /etc/nginx/conf.d/default.conf

COPY frontend.conf /etc/nginx/conf.d/

COPY --from=build /ui/build /build

EXPOSE 5000
