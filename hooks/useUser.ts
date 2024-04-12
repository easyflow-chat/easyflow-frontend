import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useNotifications } from '../components/notification/NotificationProvider';
import { UserContext } from '../context/user.context';
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
  const { user, setUser } = useContext(UserContext);
  const { fetchDataWithLoadingTimeout, isLoading } = useFetch();
  const { addFailureNotification, addSuccessNotification } = useNotifications();
  const router = useRouter();

  const login = async (email: string, password: string): Promise<string | undefined> => {
    const res = await fetchDataWithLoadingTimeout({ op: APIOperation.LOGIN, payload: { email, password } });

    if (!res.success) {
      if (res.errorCode === ErrorCodes.API_ERROR) {
        addFailureNotification('An error occurred. Please try again later');
      }
      return res.errorCode === ErrorCodes.WRONG_CREDENTIALS
        ? "Email or password don't match"
        : 'An error occurred. Please try again later';
    } else {
      const userRes = await fetchDataWithLoadingTimeout({ op: APIOperation.GET_USER });
      if (!userRes.success) {
        addFailureNotification('An error occurred. Please try again later');
      } else {
        setUser(userRes.data);
        addSuccessNotification('Login successful');
      }
      //TODO: change to the correct destination
      await router.replace('/');
    }
  };

  const signup = async (email: string, password: string): Promise<string | undefined> => {
    const res = await fetchDataWithLoadingTimeout({ op: APIOperation.SIGNUP_USER, payload: { email, password } });

    if (!res.success) {
      if (res.errorCode === ErrorCodes.API_ERROR) {
        addFailureNotification('An error occurred. Please try again later');
      }
      return res.errorCode === ErrorCodes.ALREADY_EXISTS
        ? 'Email already exists'
        : 'An error occurred. Please try again later';
    } else {
      setUser(res.data);
      await router.replace('/login');
      addSuccessNotification('Signup successful');
    }
  };

  return { user, isLoading, login, signup };
};

export default useUser;
