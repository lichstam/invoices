FROM node:12-alpine as build

RUN mkdir /ui && chown -R node:node /ui

WORKDIR /ui

COPY package*.json /ui/

USER node

RUN yarn

COPY --chown=node:node . /ui/

RUN yarn build

FROM node:12-alpine as release

RUN yarn global add serve

RUN mkdir /build && chown -R node:node /build

USER node

COPY --from=build --chown=node:node /ui/build ./build

EXPOSE 5000

CMD [ "serve", "-s", "build" ]
