import { atom } from 'recoil';

export const selectedTabState = atom<string>({
  key: 'selectedTabState',
  default: '/', // Set the default value to 'problems'
});
