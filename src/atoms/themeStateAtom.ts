import { atom } from 'recoil';

export const themeState = atom({
  key: 'themeState',
  default: 'light' as 'light' | 'dark', // Set the default theme ('light' or 'dark')
});
