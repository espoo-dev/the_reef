FROM node:14-alpine AS builder

WORKDIR /usr/src/app/front
ENV PATH /node_modules/.bin:$PATH

COPY package.json /
COPY yarn.lock /
RUN yarn install

COPY . .
RUN yarn run build

EXPOSE 3000

CMD ["yarn", "start"]
