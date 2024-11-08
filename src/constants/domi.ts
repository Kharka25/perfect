import {VoteType} from '@models/requests';

export const voteCtaData = [
  {
    label: 'vote up',
    type: VoteType.UP_VOTE,
  },
  {
    label: 'vote down',
    type: VoteType.DOWN_VOTE,
  },
];
