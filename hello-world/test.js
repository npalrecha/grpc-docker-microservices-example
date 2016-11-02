'use strict';

const grpc = require('grpc');
const http = require('http');

var helloProto = grpc.load('hello.proto');
var worldProto = grpc.load('world.proto');

var helloClient = new helloProto.hello.HelloService('localhost:50051',
  grpc.credentials.createInsecure());

var worldClient = new worldProto.world.WorldService('localhost:50051',
  grpc.credentials.createInsecure());

//helloClient.hello({}, function(err, hello) {
  //if (err) {
    //console.log(err)
  //}
  //console.log(hello.value);
//});
worldClient.say({name: "neel"}, function(err, name) {
  if (err) {
    console.log(err)
  }
  console.log(name.name);
});
