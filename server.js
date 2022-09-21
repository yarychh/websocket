const WebSocket = require('ws');
const FileReader = require('fs');

const server = new WebSocket.Server({ port: 3000 });

server.on('connection', ws => {

  ws.on('message', message => {
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        
        const respopseMessage = {
          message: JSON.parse(message)._message,
          name: JSON.parse(message)._name,
        }

        client.send(JSON.stringify(respopseMessage));
      }
    })
  });

  ws.send(JSON.stringify({
    message: 'Hi, server works!',
    name: 'System'
  }));

})
