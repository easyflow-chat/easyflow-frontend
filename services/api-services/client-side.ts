import axios, { AxiosError } from 'axios';
import { ErrorCodes } from '../../enums/tc-api.enum';
import { APIContext, APIOperation } from './common';

const clientSideRequest = async <T extends APIOperation, R = APIContext[T]['responseType']>(
  options: Omit<APIContext[T], 'responseType'> & { op: T },
): Promise<{ success: true; data: R } | { success: false; errorCode: CHAT_API.Enums.ErrorCode }> => {
  if (typeof window === 'undefined') throw new Error('Request can only be performed on the client side');

  try {
    const { data } = await axios.post<R>('/api', {
      ...options,
      headers: {
        ...options.headers,
      },
    });

    return { success: true, data };
  } catch (err) {
    if (!(err instanceof AxiosError)) return { success: false, errorCode: ErrorCodes.API_ERROR };

    if (typeof err.response?.data !== 'object') return { success: false, errorCode: ErrorCodes.API_ERROR };

    if (typeof err.response.data.error !== 'string') return { success: false, errorCode: ErrorCodes.API_ERROR };

    const errorCode = err.response.data.error;

    if (!Object.values(ErrorCodes).includes(errorCode)) return { success: false, errorCode: ErrorCodes.API_ERROR };

    return { success: false, errorCode };
  }
};

export { clientSideRequest };
