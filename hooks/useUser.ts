import { useRouter } from 'next/router';
import { useState } from 'react';
import { useNotifications } from '../components/Notification/NotificationProvider';
import { APIOperation } from '../services/api-services/common';
import { UserType } from '../types/user.type';
import useFetch from './useFetch';

type useUserType = {
  user: UserType | undefined;
  accessToken: string | undefined;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
};

const useUser = (): useUserType => {
  const [user, setUser] = useState<UserType>();
  const [accessToken, setAccessToken] = useState<string>();
  const { fetchDataWithLoadingTimeout, isLoading } = useFetch();
  const { addFailureNotification, addSuccessNotification } = useNotifications();
  const router = useRouter();

  const login = async (email: string, password: string): Promise<void> => {
    const res = await fetchDataWithLoadingTimeout({ op: APIOperation.LOGIN, payload: { email, password } });

    if (!res.success) {
      addFailureNotification('Failed');
    } else {
      setAccessToken(res.data.accessToken);
      addSuccessNotification('Success');
      //TODO: change to the correct destination
      await router.replace('/');
    }
  };

  const signup = async (email: string, password: string): Promise<void> => {
    const res = await fetchDataWithLoadingTimeout({ op: APIOperation.SIGNUP_USER, payload: { email, password } });

    if (!res.success) {
      // TODO: add error messages
      console.error(res.errorCode);
    } else {
      setUser(res.data);
      //TODO: change to the correct destination
      await router.replace('/');
    }
  };

  return { user, accessToken, isLoading, login, signup };
};

export default useUser;
