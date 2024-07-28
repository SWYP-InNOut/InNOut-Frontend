// OthersResponseDTO[];
interface OthersResponseDTO {
  memberName: string;
  memberId: number;
  postCount: number;
  inCount: number;
  outCount: number;
  userCount: number;
  recentPostDate: string;
}

interface OthersResponseDTO {
  memberName: string;
  memberId: number;
  postCount: number;
  inCount: number;
  outCount: number;
  userCount: number;
  recentPostDate: string;
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

interface OthersRoomResponsetDTO {
  memberName: string;
  isCheckedIn: boolean;
  isCheckedOut: boolean;
  chats: Chat[];
  posts: Post[];
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

///others/room/detail/{postId} 추가 예정

export interface GetDetailResponseDTO {
  ownerName: string;
  title: string;
  inContent: string;
  outContent: string;
  createdAt: string;
  isCheckedIn: boolean;
  isCheckedOut: boolean;
  chats: Chat[];
  imageUrls: string[];
}
