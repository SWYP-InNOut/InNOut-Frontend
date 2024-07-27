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
interface RoomRequestDTO {
  memberId: number;
  filterType: number;
}

interface MyRoomResponsetDTO {
  memberName: string;
  chats: Chat[];
  posts: Post[];
}

interface OthersRoomResponsetDTO {
  memberName: string;
  isCheckedIn: boolean;
  isCheckedOut: boolean;
  chats: Chat[];
  posts: Post[];
}

interface Chat {
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

interface Post {
  postId: number;
  imgUrl: string;
}

///others/room/detail/{postId} 추가 예정
