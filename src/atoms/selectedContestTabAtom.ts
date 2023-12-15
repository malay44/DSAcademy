import { atom } from 'recoil';

export const selectedContestTabState = atom<string>({
  key: 'selectedContestTabState',
  default: 'problems', // Set the default value to 'problems'
});
