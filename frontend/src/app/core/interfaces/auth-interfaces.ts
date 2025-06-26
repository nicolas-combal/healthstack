export interface CheckAuthApiResponse {
  message: string;
  user: {
    user_id: string;
    username: string;
    role: string;
    iat: number;
    exp: number;
  }
}
