import { atom } from 'recoil';

export const selectedClassTabState = atom<string>({
  key: 'selectedClassTabState',
  default: 'stream', // Set the default value to 'problems'
});
