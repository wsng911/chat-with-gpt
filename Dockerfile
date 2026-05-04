FROM node:20-alpine AS build

WORKDIR /app

RUN apk add --no-cache git && \
    git config --global user.email "dev@example.com" && \
    git config --global user.name "dev"

COPY package*.json ./
RUN npm install

COPY . .

RUN git init && git add -A && git commit -m "init" || true

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./

RUN mkdir -p /app/data

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "dist/server/index.js"]
