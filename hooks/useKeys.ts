import { deleteCookie } from 'cookies-next';
import { useContext } from 'react';
import { GlobalContext } from '../context/gloabl.context';
import { extractKey, keyFromPassword, verifyPassword } from '../helpers/key.helpers';

const useKeys = (): {
  getKeys: () => Promise<{ privateKey: CryptoKey | undefined; publicKey: CryptoKey | undefined }>;
} => {
  const { user, setUser } = useContext(GlobalContext);

  const getKeys = async (): Promise<{ privateKey: CryptoKey | undefined; publicKey: CryptoKey | undefined }> => {
    const password = await Promise.resolve().then(() => window.localStorage.getItem('signed_secret'));
    const signature = await Promise.resolve().then(() => window.localStorage.getItem('signature'));
    if (user && password && signature) {
      const verified = await verifyPassword(password, signature);
      if (!verified) {
        setUser(undefined);
        deleteCookie('access_token', { path: '/', sameSite: 'lax' });
        window.localStorage.removeItem('signed_secret');
        window.localStorage.removeItem('signature');
        return { privateKey: undefined, publicKey: undefined };
      }
      const iv = new Uint8Array(Buffer.from(user.iv, 'base64'));
      const key = await keyFromPassword(password, new Uint8Array(Buffer.from(user.salt, 'base64')));
      const decryptedPrivateKey = await window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv,
        },
        key,
        Buffer.from(user.privateKey, 'base64'),
      );

      return {
        privateKey: await window.crypto.subtle.importKey(
          'pkcs8',
          Buffer.from(extractKey(new TextDecoder().decode(decryptedPrivateKey)), 'base64'),
          { name: 'RSA-OAEP', hash: { name: 'SHA-256' } },
          true,
          ['decrypt'],
        ),
        publicKey: await window.crypto.subtle.importKey(
          'spki',
          Buffer.from(extractKey(user.publicKey), 'base64'),
          { name: 'RSA-OAEP', hash: { name: 'SHA-256' } },
          true,
          ['encrypt'],
        ),
      };
    }
    return { privateKey: undefined, publicKey: undefined };
  };

  return { getKeys };
};

export default useKeys;
