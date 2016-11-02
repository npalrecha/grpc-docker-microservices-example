# Microservices example using GRPC and Docker

just run `docker-compose up` to run. Go to `http://localhost:8000` in the browser and you should see `hello world`. Go to `http://localhost:8000/america` and you should see `hello america`.

## Services

There are 3 services:

- hello: this service just returns the hello object with a value of "hello"
- world: this service takes a name object and then returns it. If no object is passed in, it returns a name object with name = "world"
- hello-world: this service calls both hello and world and returns the result via a simple web service
