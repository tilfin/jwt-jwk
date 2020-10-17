async function verifyJWT(token, key) {  
  const decodeBase64Url = (str) => {
    const convmap = {
      '-': '+',
      '_': '/',
    };
    const urlUnsafed = str.replace(/([\-_=])/g, (match, p1) => convmap[p1]);
    return atob(urlUnsafed);
  }

  const toBuffer = (str) => {
    let buf = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) buf[i] = str.charCodeAt(i);
    return buf;
  }

  const algorithm = {
    name: 'RSASSA-PKCS1-v1_5',
    hash: { name: 'SHA-256' }
  };

  const cryptoKey = await crypto.subtle.importKey('jwk', key, algorithm, true, ['verify']);

  const [head, claim, sig] = token.split('.');
  const signature = toBuffer(decodeBase64Url(sig));
  const payload = toBuffer(`${head}.${claim}`);

  const result = await crypto.subtle.verify(algorithm, cryptoKey, signature, payload);
  if (!result) throw new Error('Failed to verify token')

  const data = JSON.parse(decodeBase64Url(claim));
  if (data.exp && (new Date(data.exp * 1000) < new Date())) throw new Error('Token expired');

  return data;
}
