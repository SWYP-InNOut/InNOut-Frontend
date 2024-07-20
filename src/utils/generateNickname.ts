// src/utils/generateNickname.js

const adjectives = [
  '춤추는',
  '노래하는',
  '요리 고수',
  '산책하는',
  '퇴근하는',
  '쇼핑하는',
  '영화광',
  '휴식중인',
  '그림 그리는',
  '글쓰는',
  '연주 중인',
  '졸린',
  '꽃 심는',
  '셀카 찍는',
  '휘파람 부는',
  '윙크 고수',
  '프로 서퍼',
  '기타 치는',
  '요가 고수',
  '러닝 중독',
  '머슬 매니아',
  '소풍 가는',
  '만화책 광',
  '공부 중독',
  '반짝 반짝',
  '두근 두근',
  '콩닥 콩닥',
  '애교쟁이',
  '자다 깬',
  '종이접기 장인',
  '배고픈',
  '흥이 많은',
  '하트 메이커',
  '뽀뽀 고수',
  '근부자',
];
const nouns = [
  '삐삐',
  '지지',
  '미니',
  '피카부',
  '체리',
  '피치',
  '빠나나',
  '탕후루',
  '크루키',
  '쿠키',
  '복숭아',
  '삐약이',
  '푸딩',
  '키위',
  '라떼',
  '바닐라',
  '카라멜',
  '카멜',
  '참새',
  '뱁새',
  '타이거',
  '티바',
  '라이언',
  '뿅뿅',
  '쁑쁑',
  '복순이',
  '복돌이',
  '옥지',
  '꽃분이',
  '핑핑이',
  '룰루',
  '쥬쥬',
];

export function generateNickname() {
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective} ${randomNoun}`;
}