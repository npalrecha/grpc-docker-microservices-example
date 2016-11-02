'use strict';

const grpc = require('grpc');
const http = require('http');
const hapi = require('hapi');
const boom = require('boom');

var helloProto = grpc.load('hello.proto');
var worldProto = grpc.load('world.proto');

var helloClient = new helloProto.hello.HelloService('hello:50051',
  grpc.credentials.createInsecure());

var worldClient = new worldProto.world.WorldService('world:50051',
  grpc.credentials.createInsecure());

// Create a server with a host and port
const server = new hapi.Server();
server.connection({
    host: '0.0.0.0',
    port: 8080,
});

// Add the route
server.route({
    method: 'GET',
    path:'/{name?}',
    handler: function(request, reply) {
      helloClient.hello({}, function(err, hello) {
        if (err) {
          reply(boom.error(err));
        }
        worldClient.say({name: request.params.name}, function(err, name) {
          if (err) {
            reply(boom.error(err));
          }
          reply(hello.value + " " + name.name);
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
