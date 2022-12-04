FROM node:16-alpine as build-image
WORKDIR /usr/src/app

COPY yarn.lock ./
COPY tsconfig.json ./
COPY ./ ./
RUN yarn add typescript
RUN yarn install
RUN yarn build
EXPOSE 8080
CMD [ "yarn", "start" ]


# FROM node:16-alpine
# WORKDIR /usr/src/app
# COPY yarn.lock ./
# COPY --from=build-image ./usr/src/app/dist ./dist
# RUN yarn install --production
# COPY . .
# EXPOSE 8080
# CMD [ "yarn", "start" ]
