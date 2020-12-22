# Builder
FROM node:10.11-alpine as builder
RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base \
  && pip install virtualenv \
  && rm -rf /var/cache/apk/*
ARG SERVER_ENV=''
ARG VERSION='1.0'
ARG MODE_PUBLISH='dev'
RUN apk add --update npm
COPY . .
RUN npm install
RUN npm run lint
RUN if [ $MODE_PUBLISH == "dev" ]; then npm run remove:config && npm run copy:config:$SERVER_ENV && sed -i -e "s/cache-control/$VERSION/g" src/config/config.json && cat src/config/config.json; fi
RUN npm run build
# Distribution
FROM node:10.11-alpine
COPY --from=builder dist dist
COPY --from=builder package.json package.json
COPY --from=builder node_modules node_modules
COPY --from=builder express-start.js express-start.js
CMD ["npm", "run", "build:start"]
EXPOSE 5000
