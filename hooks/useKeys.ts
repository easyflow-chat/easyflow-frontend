import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { GlobalContext } from '../context/gloabl.context';
import { decryptPassword, keyFromPassword } from '../helpers/key.helpers';

const useKeys = (): {
  getKeys: () => Promise<{ privateKey: CryptoKey | undefined; publicKey: CryptoKey | undefined }>;
} => {
  const { user, setUser } = useContext(GlobalContext);
  const router = useRouter();

  const getKeys = async (): Promise<{ privateKey: CryptoKey | undefined; publicKey: CryptoKey | undefined }> => {
    const encryptedPassword = await Promise.resolve().then(() => window.localStorage.getItem('secret'));
    if (user && encryptedPassword) {
      try {
        const password = await decryptPassword(encryptedPassword);
        const iv = Buffer.from(user.iv, 'base64');
        const key = await keyFromPassword(password);
        const wrapedPrivateKey = Buffer.from(user.privateKey, 'base64');
        const decryptedPrivateKey = await window.crypto.subtle.unwrapKey(
          'pkcs8',
          wrapedPrivateKey,
          key,
          {
            name: 'AES-GCM',
            iv,
          },
          {
            name: 'RSA-OAEP',
            hash: 'SHA-256',
          },
          true,
          ['unwrapKey'],
        );
        return {
          privateKey: decryptedPrivateKey,
          publicKey: await window.crypto.subtle.importKey(
            'spki',
            Buffer.from(user.publicKey, 'base64'),
            { name: 'RSA-OAEP', hash: 'SHA-256' },
            true,
            ['wrapKey'],
          ),
        };
      } catch (e) {
        console.error(e);
        setUser(undefined);
        deleteCookie('access_token', { path: '/', sameSite: 'lax' });
        window.localStorage.removeItem('signed_secret');
        window.localStorage.removeItem('signature');
        await router.replace('/unauthorized');
      }
    }
    return { privateKey: undefined, publicKey: undefined };
  };

  return { getKeys };
};

export default useKeys;
