enum APIOperation {
  SIGNUP_USER = 'post:user/signup',
  LOGIN = 'post:auth/login',
  GET_USER = 'get:user',
}

type APIContext = {
  [APIOperation.SIGNUP_USER]: RequestContext<
    APIOperation.SIGNUP_USER,
    CHAT_API.Responses.SignupResponse,
    { email: string; password: string }
  >;
  [APIOperation.LOGIN]: RequestContext<
    APIOperation.LOGIN,
    CHAT_API.Responses.LoginResponse,
    { email: string; password: string }
  >;
  [APIOperation.GET_USER]: RequestContext<APIOperation.GET_USER, CHAT_API.Responses.GetUserResponse>;
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
