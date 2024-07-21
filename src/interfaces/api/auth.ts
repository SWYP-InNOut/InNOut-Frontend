interface SignUpRequestDTO {
  email: string;
  password: string;
  confirmPassword: string;
  nickName: string;
}

interface LoginRequestDTO {
  email: string;
  password: string;
}

interface PwdSearchRequestDTO {
  email: string;
}
