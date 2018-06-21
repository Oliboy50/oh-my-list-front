FROM node:8.11.2-stretch

ARG NODE_APP_DIR=/home/node/app
ENV NODE_APP_DIR=$NODE_APP_DIR
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
ARG API_BASE_URL=http://localhost:8000
ENV API_BASE_URL=$API_BASE_URL
ARG HTTPS_ENABLED=false
ENV HTTPS_ENABLED=$HTTPS_ENABLED

WORKDIR ${NODE_APP_DIR}

RUN npm install -g npm@5.6.0

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

USER node

CMD npm start
