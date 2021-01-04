# Builder
FROM node:12.20-alpine as builder
RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base \
  && pip install virtualenv \
  && rm -rf /var/cache/apk/*
ARG SERVER_ENV=''
ARG VERSION='1.0'
RUN apk add --update npm
COPY . .
RUN npm install --no-optional
RUN npm run lint
RUN npm run copy:config:$SERVER_ENV && sed -i -e "s/cache-control/$VERSION/g" src/config/config.json && cat src/config/config.json
RUN npm run build
# Distribution
FROM node:12.20-alpine
COPY --from=builder dist dist
COPY --from=builder package.json package.json
COPY --from=builder node_modules node_modules
COPY --from=builder express-start.js express-start.js
CMD ["npm", "run", "start"]
EXPOSE 5000
