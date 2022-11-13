import React, { FC, useState } from 'react';
import { EmojiProviderProps } from './props';
import { EmojiContext } from './contexts';

const EmojiProvider: FC<EmojiProviderProps> = (
  props: EmojiProviderProps
): any => {
  const { children }: EmojiProviderProps = props;

  const [data, setData] = useState<any>(null);

  return (
    <EmojiContext.Provider value={{ data, setData }}>
      {children}
    </EmojiContext.Provider>
  );
};

export default EmojiProvider;

export { useEmojiDefaultData } from './hooks';
