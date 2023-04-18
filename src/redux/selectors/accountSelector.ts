import { createDeepEqualSelector } from './helpers';
import { RootState } from '../store';

const accountSelector = (state: RootState) => state.account;

export const usernameSelector = createDeepEqualSelector(
  accountSelector,
  (state) => state.username
);
