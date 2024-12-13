FROM node:18-alpine AS builder

RUN apk add --no-cache libc6-compat && \
    npm i -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

ENV NODE_ENV=production
RUN pnpm install --frozen-lockfile --prod

FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY . .

USER node

EXPOSE 8080
CMD ["sh", "-c", "node deploy-commands.js && node index.js"]