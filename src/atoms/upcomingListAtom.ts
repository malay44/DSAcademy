// recoilState.ts
import { atom } from 'recoil';

export const upcomingListState = atom<string[]>({
  key: 'upcomingListState',
  default: [
    'Assignment10',
    'Assignment9',
    'Assignment8',
    'Assignment7',
    'Assignment6',
  ],
});
