# JWT-JWK

An example verifying a JWT issued at a server in a browser

## Generate RSA Key

```
$ openssl genrsa -out jwk.pem 4096
$ openssl rsa -in jwk.pem -RSAPublicKey_out -out jwk-public.pem
```

## Prepare

```
$ npm install jsonwebtoken rasha
```

## issue a JWT with Node.js

```
$ node issue.js jwk.pem '{"foo":"bar"}'
```

## make a JWK cert key with Node.js

```
$ node pem2jwk.js jwk-public.pem
```

## Verify JWT in a browser

importing verify-in-browser.js

```js
const jwkCertKey = {
  "kty": "RSA",
  "n": "xxxxxxxxxxxx",
  "e": "AQAB"
};

const jwt = 'xxxxxxxxxxxxx.xxxxxxxxxxx.xxxxxxxxxxxxxxxxx';

await verifyJWT(jwt, jwkCertKey);
```

### Success result

```js
{ "foo":"bar", iat: 1602000000, exp: 1613000000 }
```
