import { UserType } from '../../types/user.type';

enum APIOperation {
  SIGNUP_USER = 'post:user/signup',
  LOGIN = 'post:auth/login',
  GET_USER = 'get:user',
  GET_PROFILE_PICTURE = 'get:user/profile-picture',
  UPDATE_USER = 'put:user',
  GET_CHAT_PREVIEW = 'get:chat/preview',
  CREATE_CHAT = 'post:chat',
}

type APIContext = {
  [APIOperation.SIGNUP_USER]: RequestContext<
    APIOperation.SIGNUP_USER,
    CHAT_API.Responses.SignupResponse,
    { email: string; name: string; password: string; publicKey: string; privateKey: string; iv: string; salt: string }
  >;
  [APIOperation.LOGIN]: RequestContext<
    APIOperation.LOGIN,
    CHAT_API.Responses.LoginResponse,
    { email: string; password: string }
  >;
  [APIOperation.GET_USER]: RequestContext<APIOperation.GET_USER, CHAT_API.Responses.GetUserResponse>;
  [APIOperation.GET_PROFILE_PICTURE]: RequestContext<
    APIOperation.GET_PROFILE_PICTURE,
    CHAT_API.Responses.GetProfilePictureResponse
  >;
  [APIOperation.UPDATE_USER]: RequestContext<
    APIOperation.UPDATE_USER,
    CHAT_API.Responses.UpdateUserResponse,
    { email?: string; profilePicture?: string; name?: string; bio?: string }
  >;
  [APIOperation.GET_CHAT_PREVIEW]: RequestContext<
    APIOperation.GET_CHAT_PREVIEW,
    CHAT_API.Responses.GetChatPreviewResponse
  >;
  [APIOperation.CREATE_CHAT]: RequestContext<
    APIOperation.CREATE_CHAT,
    CHAT_API.Responses.CreateChatResponse,
    {
      name: string;
      description: string | undefined;
      picture: string | undefined;
      users: UserType['id'][];
      userKeys: { key: string; userId: UserType['id'] }[];
    }
  >;
};

type WithPayload<TBase, TPayload> = TPayload extends void
  ? TBase
  : TBase & {
      payload: TPayload;
    };

type WithURLParams<TBase, TURLParams> = TURLParams extends void
  ? TBase
  : TBase & {
      params: TURLParams;
    };

type WithQueryParams<TBase, TQuery> = TQuery extends void
  ? TBase
  : TBase & {
      query: TQuery;
    };

type RequestContext<
  TEndpoint extends APIOperation,
  TResponse = void,
  TPayload = void,
  TURLParams = void,
  TQuery = void,
> = WithQueryParams<
  WithURLParams<
    WithPayload<
      {
        op: TEndpoint;
        responseType: TResponse;
        headers?: Record<string, string>;
      },
      TPayload
    >,
    TURLParams
  >,
  TQuery
>;

export { APIOperation };
export type { APIContext };
