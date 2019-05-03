FROM node:8.16.0

# Global install yarn package manager
RUN apt-get update && apt-get install -y apt-utils curl build-essential apt-transport-https && \
    curl -sL https://deb.nodesource.com/setup_7.x | bash - && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg |  apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y nodejs yarn

RUN npm install -g node-gyp

COPY package.json /build/
COPY yarn.lock /build/
COPY .npmrc /build/
WORKDIR /build

RUN yarn install --pure-lockfile

COPY . /build
