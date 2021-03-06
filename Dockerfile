FROM node:14-alpine AS build

WORKDIR /build

COPY . .
RUN npm i yarn
RUN yarn install
RUN yarn react-build

FROM node:14-alpine AS final

RUN mkdir build

COPY --from=build ./build/build ./build

RUN npm i -g serve

EXPOSE 5000

CMD ["serve", "-s", "build"]
