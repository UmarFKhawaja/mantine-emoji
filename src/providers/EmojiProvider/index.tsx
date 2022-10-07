import React, { FC } from 'react';
import { EmojiProviderProps } from './props';
import { useEmojiDefaultData } from './hooks';
import { EmojiContext } from './contexts';

const EmojiProvider: FC<EmojiProviderProps> = (props: EmojiProviderProps) => {
  const { children }: EmojiProviderProps = props;

  const { emojiDefaultProps } = useEmojiDefaultData();
  return (
    <EmojiContext.Provider value={emojiDefaultProps}>
      {children}
    </EmojiContext.Provider>
  );
};

export default EmojiProvider;

export { useEmojiDefaultData } from './hooks';
