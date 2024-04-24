import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useNotifications } from '../components/notification/NotificationProvider';
import { GlobalContext } from '../context/gloabl.context';
import { ErrorCodes } from '../enums/tc-api.enum';
import { APIOperation } from '../services/api-services/common';
import { UserType } from '../types/user.type';
import useFetch from './useFetch';

type useUserType = {
  user: UserType | undefined;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<string | undefined>;
  signup: (email: string, password: string) => Promise<string | undefined>;
};

const useUser = (): useUserType => {
  const { t } = useTranslation();
  const { user, setUser } = useContext(GlobalContext);
  const { fetchDataWithLoadingTimeout, isLoading } = useFetch();
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
        setUser(userRes.data);
        addSuccessNotification(t('login:success'));
        await router.replace(`/chat/${userRes.data.id}`);
      }
    }
  };

  const signup = async (email: string, password: string): Promise<string | undefined> => {
    const res = await fetchDataWithLoadingTimeout({ op: APIOperation.SIGNUP_USER, payload: { email, password } });

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
