import { UserType } from './user.type';

declare global {
  export namespace CHAT_API {
    export namespace Enums {
      type ErrorCode = 'API_ERROR' | 'NOT_FOUND' | 'NOT_ALLOWED';
    }
    export namespace Responses {
      type SignupResponse = UserType;
      type LoginResponse = { accessToken: string };
    }
  }
}
