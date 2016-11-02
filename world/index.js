/* eslint-disable no-console */

const grpc = require('grpc');

const worldProto = grpc.load('world.proto');
const server = new grpc.Server();

server.addProtoService(worldProto.world.WorldService.service, {
  say: (call, callback) => {
    const name = call.request;
    if (name.name === '') {
      name.name = 'world';
    }
    callback(null, name);
  },
});

server.bind('0.0.0.0:50051',
grpc.ServerCredentials.createInsecure());
console.log('Server running at http://0.0.0.0:50051');
server.start();
