import { useContext } from 'react';
import { EmojiContext } from './contexts';

export function useEmojiDefaultData() {
  const emojiDefaultProps = useContext(EmojiContext);

  return {
    emojiDefaultProps
  };
}
