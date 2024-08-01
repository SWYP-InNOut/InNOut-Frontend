interface InOutRequestDTO {
  postId: number;
  isMember: boolean;
  in: boolean;
  out: boolean;
}

interface InOutResponseDTO {
  inCount: number;
  outCount: number;
  in: boolean;
  out: boolean;
}
