const http = require('http');
const faye = require('faye');

// Create a simple HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Faye WebSocket Server');
});

// Create a Faye instance attached to the HTTP server
const bayeux = new faye.NodeAdapter({ mount: '/faye', timeout: 45 });
bayeux.attach(server);

// Map to store the clientId for connected clients
const clients = {};

bayeux.on('handshake', (message) => {
    console.log('Received message:', message);  // Log the incoming message
    console.log(`Assigned clientId: ${message}`);
    return message;
});
// Listen for publish and subscribe events
bayeux.on('publish', (clientId, channel, data) => {
    console.log(`Client ${clientId} published to ${channel}:`, data);
});

bayeux.on('subscribe', (clientId, channel) => {
    console.log(`Client ${clientId} subscribed to ${channel}`);
});

// // Start the HTTP server
// server.listen(8080, '192.168.29.69', () => {
//     console.log('Faye server is running on http://192.168.29.69:8080/faye');
// });


server.listen(process.env.PORT || 8080, () => {
    console.log(`Faye server is running on http://localhost:${process.env.PORT || 8080}/faye`);
});
