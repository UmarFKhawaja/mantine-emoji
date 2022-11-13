import { Dispatch } from 'react';

interface emojiData {
  [key: string]: any;
}

export type EmojiProviderType = {
  data: emojiData;

  setData: Dispatch<any>;
};
