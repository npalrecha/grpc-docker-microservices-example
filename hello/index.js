var grpc = require('grpc');

var helloProto = grpc.load('hello.proto');

var server = new grpc.Server();

server.addProtoService(helloProto.hello.HelloService.service, {
  hello: function(call, callback) {
    callback(null, {value: "hello"});
  }
});

server.bind('0.0.0.0:50051',
grpc.ServerCredentials.createInsecure());
console.log('Server running at http://0.0.0.0:50051');
server.start();
