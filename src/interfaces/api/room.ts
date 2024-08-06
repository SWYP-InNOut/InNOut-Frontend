// OthersResponseDTO[];
export interface ShareLinkResponseDTO {
  link: string;
  anonymous: boolean;
}
//0: 최신순, 1: in많은순, 2: out많은순, 3: 오래된순
// 자신의 룸, 다른 사람 룸 둘다
export interface RoomRequestDTO {
  ownerId: number;
  filterType: number;
}

export interface MyRoomResponseDTO {
  memberName: string;
  chats: Chat[];
  posts: Post[];
  public: boolean;
}

export interface OthersStuffListResponseDTO {
  memberName: string;
  memberId: number;
  imageUrl: string;
  memberImageId: number;
  postId: number;
}

export interface Chat {
  chatId: number;
  sender: number;
  createdAt: string;
  content: string;
  replyContent: string | null;
  replySenderName: string | null;
  stuffName: string | null;
  postChat: boolean;
  reply: boolean;
}

export interface Post {
  postId: number;
  imgUrl: string;
}

export interface IsPublicResponseDTO {
  public: boolean;
}

export interface GetDetailResponseDTO {
  ownerName: string;
  ownerId: number;
  ownerImageId: number;
  title: string;
  inContent: string;
  outContent: string;
  createdAt: string;
  inCount: number;
  outCount: number;
  chats: Chat[];
  imageUrls: string[];
  checkedIn: boolean;
  checkedOut: boolean;
}
