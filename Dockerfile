# First stage: Build
FROM node:16 as builder

RUN npm i -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

ENV NODE_ENV=production
RUN pnpm install

# Second stage: Runtime
FROM node:16-alpine as runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY . .

EXPOSE 8080
CMD node deploy-commands.js && node index.js