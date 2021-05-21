# Stage 1 Build
FROM node:current-slim AS BUILD
# set the current working directory to /app
WORKDIR /app
# copy only package.json and package-lock.json
COPY package.json package-lock.json ./
# run npm install
RUN npm install --only=production
RUN npm prune --production
# copy node.js src files
COPY src src

# Stage 2
FROM node:current-slim
WORKDIR /app
# copy files from build
COPY --from=BUILD /app/src ./src
COPY --from=BUILD /app/node_modules ./node_modules
# declare that your server will listen on port 80
EXPOSE 80
# set the entrypoint command
ENTRYPOINT ["node", "./src/app.js"]