import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useNotifications } from '../components/notification/NotificationProvider';
import { GlobalContext } from '../context/gloabl.context';
import { ErrorCodes } from '../enums/tc-api.enum';
import { encryptPassword, hashString, keyFromPassword } from '../helpers/key.helpers';
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
        await Promise.resolve().then(async () =>
          window.localStorage.setItem('secret', await encryptPassword(password)),
        );
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
      ['wrapKey', 'unwrapKey'],
    );

    const publicKey = Buffer.from(await window.crypto.subtle.exportKey('spki', keyPair.publicKey)).toString('base64');

    const key = await keyFromPassword(await hashString(password));
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const ivString = Buffer.from(iv).toString('base64');
    const wrapedPrivateKey = Buffer.from(
      await window.crypto.subtle.wrapKey('pkcs8', keyPair.privateKey, key, {
        name: 'AES-GCM',
        iv,
      }),
    ).toString('base64');

    const res = await fetchDataWithLoadingTimeout({
      op: APIOperation.SIGNUP_USER,
      payload: {
        email,
        name,
        password,
        publicKey,
        privateKey: wrapedPrivateKey,
        iv: ivString,
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
