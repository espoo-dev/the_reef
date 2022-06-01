FROM node:14-alpine AS builder

WORKDIR /
ENV PATH /node_modules/.bin:$PATH
COPY package.json /
COPY yarn.lock /
RUN yarn install