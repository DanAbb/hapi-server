'use strict';

const Hapi = require('hapi');
var corsHeaders = require('hapi-cors-headers')

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  host : 'localhost',
  port: 3000,
});

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
        method: 'GET',
        path: '/',
        config: {
            handler: function (request, reply) {
                reply.file('./views/index.html');
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/api/players',
        config: {
            handler: function (request, reply) {
                reply.file('./json/players.json');
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/api/points',
        config: {
            handler: function (request, reply) {
                reply.file('./json/points.json');
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/api/gw/{x}',
        config: {
            handler: function (request, reply) {
                reply.file(`./json/gw${encodeURIComponent(request.params.x)}.json`);
            }
        }
    });
});

server.ext('onPreResponse', corsHeaders)

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});