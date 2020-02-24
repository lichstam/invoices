FROM node:12

RUN mkdir /api && chown -R node:node /api

WORKDIR /api

COPY package*.json /api/

RUN npm install

COPY --chown=node:node . /api/

USER node

EXPOSE 6200

CMD ["npm", "start"]
