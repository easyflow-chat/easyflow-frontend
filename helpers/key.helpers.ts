export const keyFromPassword = async (password: string, salt: Uint8Array): Promise<CryptoKey> => {
  const keyFromPassword = await window.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey'],
  );

  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyFromPassword,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
};

export const extractKey = (key: string): string => {
  return key.replace(new RegExp('(-----BEGIN .*?-----\\n|\\n-----END .+?-----)', 'gm'), '');
};

export const hashPassword = async (password: string): Promise<string> => {
  return Buffer.from(await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))).toString(
    'base64',
  );
};

export const signPassword = async (password: string): Promise<{ hashedPassword: string; signature: string }> => {
  const hashedPassword = await hashPassword(password);
  const key = await window.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(navigator.userAgent),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey'],
  );

  const derivedKey = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: new Uint8Array(Buffer.from(hashedPassword, 'base64')),
      iterations: 100000,
      hash: 'SHA-256',
    },
    key,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
  const signature = Buffer.from(
    await window.crypto.subtle.sign('HMAC', derivedKey, new TextEncoder().encode(hashedPassword)),
  ).toString('base64');
  return { hashedPassword, signature };
};

export const verifyPassword = async (hashedPassword: string, signature: string): Promise<boolean> => {
  const key = await window.crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(navigator.userAgent),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey'],
  );

  const derivedKey = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: new Uint8Array(Buffer.from(hashedPassword, 'base64')),
      iterations: 100000,
      hash: 'SHA-256',
    },
    key,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
  const verified = await window.crypto.subtle.verify(
    'HMAC',
    derivedKey,
    new Uint8Array(Buffer.from(signature, 'base64')),
    new TextEncoder().encode(hashedPassword),
  );
  return verified;
};

export const encrypt = async (data: string, key: CryptoKey): Promise<string> => {
  return Buffer.from(
    await window.crypto.subtle.encrypt({ name: 'RSA-OAEP' }, key, new Uint8Array(Buffer.from(data))),
  ).toString('base64');
};

export const decrypt = async (data: string, key: CryptoKey): Promise<string> => {
  return new TextDecoder().decode(
    await window.crypto.subtle.decrypt('RSA-OAEP', key, new Uint8Array(Buffer.from(data, 'base64'))),
  );
};
