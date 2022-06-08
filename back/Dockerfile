FROM node:16-alpine AS builder

WORKDIR /usr/src/app/back
ENV PATH /node_modules/.bin:$PATH

COPY package.json /
COPY yarn.lock /

RUN yarn install
COPY . .

ENV PORT 8081

RUN yarn run build
COPY .env ./dist/

EXPOSE 8081 5432

CMD ["yarn", "start"]
