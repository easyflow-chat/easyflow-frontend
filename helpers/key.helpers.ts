import { getCookie } from 'cookies-next';

export const keyFromPassword = async (password: ArrayBuffer): Promise<CryptoKey> => {
  return window.crypto.subtle.importKey('raw', password, 'AES-GCM', false, ['wrapKey', 'unwrapKey']);
};

export const importKeyFromString = async (str: string): Promise<CryptoKey> => {
  return window.crypto.subtle.importKey('raw', await hashString(str), 'AES-GCM', false, ['encrypt', 'decrypt']);
};

export const hashString = async (str: string): Promise<ArrayBuffer> => {
  return await window.crypto.subtle.digest('SHA-256', Buffer.from(str));
};

export const encryptPassword = async (password: string): Promise<string> => {
  const hashedPassword = await hashString(password);
  const key = await importKeyFromString(getCookie('access_token') ?? '');
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  window.localStorage.setItem('iv', Buffer.from(iv).toString('base64'));

  return Buffer.from(await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, hashedPassword)).toString(
    'base64',
  );
};

export const decryptPassword = async (encryptedPassword: string): Promise<ArrayBuffer> => {
  const key = await importKeyFromString(getCookie('access_token') ?? '');
  const iv = Buffer.from(window.localStorage.getItem('iv') ?? '', 'base64');
  return window.crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, Buffer.from(encryptedPassword, 'base64'));
};

export const encrypt = async (data: string, key: CryptoKey, iv: Uint8Array): Promise<string> => {
  return Buffer.from(await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, Buffer.from(data))).toString(
    'base64',
  );
};

export const decrypt = async (data: string, key: CryptoKey, iv: Uint8Array): Promise<string> => {
  return Buffer.from(
    await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, Buffer.from(data, 'base64')),
  ).toString();
};
