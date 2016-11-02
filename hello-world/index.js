/* eslint-disable no-console */

const grpc = require('grpc');
const hapi = require('hapi');
const boom = require('boom');

const helloProto = grpc.load('hello.proto');
const worldProto = grpc.load('world.proto');

const helloClient = new helloProto.hello.HelloService('hello:50051', grpc.credentials.createInsecure());

const worldClient = new worldProto.world.WorldService('world:50051', grpc.credentials.createInsecure());

// Create a server with a host and port
const server = new hapi.Server();
server.connection({
  host: '0.0.0.0',
  port: 8080,
});

// Add the route
server.route({
  method: 'GET',
  path: '/{name?}',
  handler(request, reply) {
    helloClient.hello({}, (helloErr, hello) => {
      if (helloErr) {
        reply(boom.error(helloErr));
      }
      worldClient.say({ name: request.params.name }, (worldErr, name) => {
        if (worldErr) {
          reply(boom.error(worldErr));
        }
        reply(`${hello.value} ${name.name}`);
      });
    });
  },
});

// Start the server
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
