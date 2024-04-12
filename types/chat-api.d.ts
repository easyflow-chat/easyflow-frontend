import { ErrorCodes } from '../enums/tc-api.enum';
import { UserType } from './user.type';

declare global {
  export namespace CHAT_API {
    export namespace Enums {
      type ErrorCode = ErrorCodes;
    }
    export namespace Responses {
      type SignupResponse = UserType;
      type LoginResponse = { accessToken: string };
      type GetUserResponse = UserType;
    }
  }
}
