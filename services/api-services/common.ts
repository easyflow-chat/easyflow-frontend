enum APIOperation {
  SIGNUP_USER = 'post:users/signup',
  LOGIN = 'post:auth/login',
}

type APIContext = {
  [APIOperation.SIGNUP_USER]: RequestContext<APIOperation.SIGNUP_USER, CHAT_API.Responses.SignupResponse, { email: string; password: string }>,
  [APIOperation.LOGIN]: RequestContext<APIOperation.LOGIN, CHAT_API.Responses.LoginResponse, {email: string; password: string}>,
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

type WithQueryParams<TBase, TQueryParams> = TQueryParams extends void
  ? TBase
  : TBase & {
      query: TQueryParams;
    };

type RequestContext<TEndpoints extends APIOperation, TResponse = void, TPayload = void, TURLParams = void, TQueryParams = void> = WithQueryParams<
  WithURLParams<WithPayload<{ op: TEndpoints; responseType: TResponse; header: Record<string, string> }, TPayload>, TURLParams>,
  TQueryParams
>;

export { APIOperation };
export type { APIContext };

