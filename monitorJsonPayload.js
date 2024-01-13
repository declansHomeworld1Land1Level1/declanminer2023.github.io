const dgram = require('dgram');
const fs = require('fs');

const PORT = 7853;
const SERVER_ADDRESS = 'api_json_scan.declanminer2023.github.io';

const client = dgram.createSocket('udp4');
client.bind(PORT, SERVER_ADDRESS);

console.log(`Monitoring JSONPayload at ${SERVER_ADDRESS}:${PORT}`);

client.on('listening', () => {
  const address = client.address();
  console.log(`UDP listening on ${address.address}:${address.port}`);
});

client.on('message', (msg, rinfo) => {
  try {
    const jsonPayload = JSON.parse(msg);
    console.log(`JSONPayload received:`);
    console.dir(jsonPayload, { depth: null, colors: true });

    // Perform actions based on the content of jsonPayload here
    // ...

    // Optionally, persist JSONPayload to a log file
    fs.appendFileSync('jsonPayloadLog.txt', `${JSON.stringify(jsonPayload)}\n`);
  } catch (error) {
    console.warn(`Malformed JSONPayload received:\n${msg}\n${error.stack}`);
  }
});

process.on('SIGINT', () => {
  client.close(() => {
    console.log('\nShutdown monitoring.');
    process.exit(0);
  });
});
