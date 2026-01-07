export type ResetPasswordRequest = {
  key?: string;
  password: string;
  confirm_password: string;
};

export type ResetPasswordResponse = {
  message?: string;
};
