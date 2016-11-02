FROM grpc/node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install

EXPOSE 50051

CMD [ "npm", "start" ]
