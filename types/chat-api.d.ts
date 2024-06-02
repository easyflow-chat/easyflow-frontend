import { ErrorCodes } from '../enums/tc-api.enum';
import { ChatPreviewType, ChatType } from './chat.type';
import { MessageType } from './message.type';
import { UserType } from './user.type';

declare global {
  export namespace CHAT_API {
    export namespace Enums {
      type ErrorCode = ErrorCodes;
    }
    export namespace Responses {
      type SignupResponse = UserType;
      type SavePublicPrivateKeysResponse = { success: boolean };
      type LoginResponse = { accessToken: string };
      type GetUserResponse = UserType;
      type GetProfilePictureResponse = string;
      type UpdateUserResponse = UserType;
      type CreateChatResponse = ChatType;
      type GetChatPreviewResponse = ChatPreviewType[];
      type GetChatResponse = ChatType;
      type SendMessageResponse = MessageType;
    }
  }
}
