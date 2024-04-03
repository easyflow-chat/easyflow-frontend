import axios from 'axios';
import { APIContext, APIOperation } from './common';

const clientSideRequest = async <T extends APIOperation, R = APIContext[T]['responseType']>(
  options: Omit<APIContext[T], 'responseType'> & { op: T },
): Promise<{ success: true; data: R } | { success: false; errorCode: CHAT_API.Enums.ErrorCode }> => {
  if (typeof window === 'undefined') throw new Error('Request can only be performed on the client side');

  try {
    const { data } = axios.post<R>('/api', {
      ...options,
      headers: {
        ...options.header,
      }
    });

    return {success: true, data}
  } catch {
    
  }
};
