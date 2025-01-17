FROM node:16-alpine

WORKDIR /app

# VOLUME /data

COPY . .

RUN yarn install && yarn build

EXPOSE 4000

ENV MONGO_URL=mongodb+srv://admin:admin@sortlog-dev.tz5kdhn.mongodb.net/sortlog-dev
ENV auth_encryption_salt=some-salt
ENV PORT=4000

# CMD ["cp", "package.json", "data/"]
CMD yarn start

# From node:16-alpine

# WORKDIR /app
# # COPY --from=0 ["node_modules", "dist", "./"]
# COPY --from=0 /app/node_modules .
# COPY --from=0 /app/dist .
# COPY --from=0 /app/package.json .

# ENV MONGO_URL=mongodb+srv://admin:admin@sortlog-dev.tz5kdhn.mongodb.net/sortlog-dev
# ENV auth_encryption_salt=some-salt
# ENV PORT=4000


# CMD ["yarn", "start"]
