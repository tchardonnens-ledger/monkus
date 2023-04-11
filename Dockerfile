FROM node:16

RUN npm i -g pnpm

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json pnpm-lock.yaml ./

RUN pnpm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "deploy-commands.js" ]