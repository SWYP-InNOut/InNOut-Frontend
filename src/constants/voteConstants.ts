export const VOTE_TYPES = {
  IN: 'In',
  OUT: 'Out',
} as const;

export type VoteType = (typeof VOTE_TYPES)[keyof typeof VOTE_TYPES];
