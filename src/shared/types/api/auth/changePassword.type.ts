export type ChangePasswordRequest = {
  password: string;
  confirm_password: string;
};

export type ChangePasswordResponse = {
  message?: string;
};
