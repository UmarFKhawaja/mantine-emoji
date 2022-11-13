import { createContext } from 'react';
import { EmojiProviderType } from './type';

export const EmojiContext = createContext<EmojiProviderType>({
  data: {},

  setData: () => {}
});
