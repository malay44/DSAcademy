import { atom } from 'recoil';

export const userTypeState = atom({
  key: 'userTypeState',
  default: 'teacher' as 'teacher' | 'student', // Set the default theme ('light' or 'dark')
});
