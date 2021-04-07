# Builder
FROM node:12.20-alpine
RUN apk add --update \
  python \
  python-dev \
  py-pip \
  build-base \
  && pip install virtualenv \
  && rm -rf /var/cache/apk/*
ARG SERVER_ENV=''
ARG VERSION='1.0'
COPY . .

RUN apk add --update npm && \
  npm install --no-optional --legacy-peer-deps && \
  npm run lint && \
  npm run copy:config:$SERVER_ENV && \
  sed -i -e "s/cache-control/$VERSION/g" src/config/config.json && \
  cat src/config/config.json && \
  npm run build

CMD ["npm", "run", "start"]
EXPOSE 5000
