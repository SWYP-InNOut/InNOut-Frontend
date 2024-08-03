interface SignUpRequestDTO {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

interface LoginRequestDTO {
  email: string;
  password: string;
}

interface PwdSearchRequestDTO {
  email: string;
}

interface modifyUserRequestDTO {
  memberId: number;
  nickname: string;
  memberImageId: number;
}
