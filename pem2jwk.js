const fs = require('fs');
const Rasha = require('rasha');

const filePath = process.argv.pop()
const pem = fs.readFileSync(filePath, 'ascii');

Rasha.import({ pem }).then(jwk => {
  console.info(JSON.stringify(jwk, null, 2));
});
