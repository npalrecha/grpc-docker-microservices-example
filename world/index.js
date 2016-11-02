var grpc = require('grpc');
var worldProto = grpc.load('world.proto');
var server = new grpc.Server();

server.addProtoService(worldProto.world.WorldService.service, {
  say: function(call, callback) {
    var name = call.request;
    if (name.name == "") {
      name.name = "world";
    }
    callback(null, name);
  }
});


server.bind('0.0.0.0:50051',
grpc.ServerCredentials.createInsecure());
console.log('Server running at http://0.0.0.0:50051');
server.start();
