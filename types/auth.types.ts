export interface LoginCredentials {
  username: string;
  password: string;
}

export interface ILoginResponse {
  data: {
    access_token: string;
    token_type: string;
    expires_in: string;
  };
}

export interface User {
  id: string;
  username: string;
}
