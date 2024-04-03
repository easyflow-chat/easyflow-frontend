import { useRouter } from 'next/router';
import { useState } from 'react';
import { APIOperation } from '../services/api-services/common';
import { UserType } from '../types/user.type';
import useFetch from './useFetch';

type useUserType = {
  user: UserType | undefined;
  accessToken: string | undefined;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
};

const useUser = (): useUserType => {
  const [user, setUser] = useState<UserType>();
  const [accessToken, setAccessToken] = useState<string>();
  const { fetchDataWithLoadingTimeout, isLoading } = useFetch();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    const res = await fetchDataWithLoadingTimeout({ op: APIOperation.LOGIN, payload: { email, password } });

    if (!res.success) {
      // TODO: add error messages
      console.error('an error accured');
    } else {
      setAccessToken(res.data.accessToken);
      //TODO: change to the correct destination
      router.replace('/');
    }
  };

  const signup = async (email: string, password: string) => {
    const res = await fetchDataWithLoadingTimeout({ op: APIOperation.SIGNUP_USER, payload: { email, password } });

    if (!res.success) {
      // TODO: add error messages
      console.error('an error accured');
    } else {
      setUser(res.data);
      //TODO: change to the correct destination
      router.replace('/');
    }
  };

  return { user, accessToken, login, signup };
};

export default useUser;
