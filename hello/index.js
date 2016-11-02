/* eslint-disable no-console */

const grpc = require('grpc');

const helloProto = grpc.load('hello.proto');
const server = new grpc.Server();

server.addProtoService(helloProto.hello.HelloService.service, {
  hello: (call, callback) => {
    callback(null, { value: 'hello' });
  },
});

server.bind('0.0.0.0:50051',
grpc.ServerCredentials.createInsecure());
console.log('Server running at http://0.0.0.0:50051');
server.start();
