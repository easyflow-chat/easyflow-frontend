import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useNotifications } from '../components/notification/NotificationProvider';
import { GlobalContext } from '../context/gloabl.context';
import { ErrorCodes } from '../enums/tc-api.enum';
import { hashPassword, keyFromPassword, signPassword } from '../helpers/key.helpers';
import { APIOperation } from '../services/api-services/common';
import { UserType } from '../types/user.type';
import useFetch from './useFetch';

type useUserType = {
  user: UserType | undefined;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<string | undefined>;
  signup: (email: string, name: string, password: string) => Promise<string | undefined>;
};

const useUser = (): useUserType => {
  const { t } = useTranslation();
  const { user, setUser } = useContext(GlobalContext);
  const { fetchDataWithLoadingTimeout, isLoading, setIsLoading } = useFetch();
  const { addFailureNotification, addSuccessNotification } = useNotifications();
  const router = useRouter();

  const login = async (email: string, password: string): Promise<string | undefined> => {
    const res = await fetchDataWithLoadingTimeout({ op: APIOperation.LOGIN, payload: { email, password } });

    if (!res.success) {
      if (res.errorCode === ErrorCodes.API_ERROR) {
        addFailureNotification(t('errors.server'));
      }
      return res.errorCode === ErrorCodes.WRONG_CREDENTIALS ? t('login:errors.credentials') : t('errors.server');
    } else {
      const userRes = await fetchDataWithLoadingTimeout({ op: APIOperation.GET_USER });
      if (!userRes.success) {
        addFailureNotification(t('errors.server'));
      } else {
        setIsLoading(true);
        const signedSecret = await signPassword(password);
        window.localStorage.setItem('signed_secret', signedSecret.hashedPassword);
        window.localStorage.setItem('signature', signedSecret.signature);
        setUser(userRes.data);
        addSuccessNotification(t('login:success'));
        setIsLoading(false);
        await router.replace('/chat');
      }
    }
  };

  const signup = async (email: string, name: string, password: string): Promise<string | undefined> => {
    setIsLoading(true);
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: 'RSA-OAEP',
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: 'SHA-256',
      },
      true,
      ['encrypt', 'decrypt'],
    );

    const privateKey = `-----BEGIN PRIVATE KEY-----\n${Buffer.from(
      await window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey),
    ).toString('base64')}\n-----END PRIVATE KEY-----`;

    const publicKey = `-----BEGIN PUBLIC KEY-----\n${Buffer.from(
      await window.crypto.subtle.exportKey('spki', keyPair.publicKey),
    ).toString('base64')}\n-----END PUBLIC KEY-----`;

    const salt = window.crypto.getRandomValues(new Uint8Array(128));
    const saltBase64 = Buffer.from(salt).toString('base64');
    const key = await keyFromPassword(await hashPassword(password), salt);
    const iv = window.crypto.getRandomValues(new Uint8Array(128));
    const ivBase64 = Buffer.from(iv).toString('base64');

    const encryptedPrivateKey = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      key,
      new TextEncoder().encode(privateKey),
    );

    const encryptedPrivateKeyBase64 = Buffer.from(new Uint8Array(encryptedPrivateKey)).toString('base64');

    const res = await fetchDataWithLoadingTimeout({
      op: APIOperation.SIGNUP_USER,
      payload: {
        email,
        name,
        password,
        publicKey,
        privateKey: encryptedPrivateKeyBase64,
        iv: ivBase64,
        salt: saltBase64,
      },
    });

    if (!res.success) {
      if (res.errorCode === ErrorCodes.API_ERROR) {
        addFailureNotification(t('errors.server'));
      }
      return res.errorCode === ErrorCodes.ALREADY_EXISTS ? t('signup:errors.emailExists') : t('errors.server');
    } else {
      setUser(res.data);
      await router.replace('/login');
      addSuccessNotification(t('signup:success'));
    }
  };

  return { user, isLoading, login, signup };
};

export default useUser;
