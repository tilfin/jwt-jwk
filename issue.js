const fs = require('fs');
const jwt = require('jsonwebtoken');

const [keyPath, data] = process.argv.slice(2);
const privateKey = fs.readFileSync(keyPath);
const claim = JSON.parse(data);

const token = jwt.sign(claim, privateKey, { algorithm: 'RS256', expiresIn: '100y' });
console.log(token)
