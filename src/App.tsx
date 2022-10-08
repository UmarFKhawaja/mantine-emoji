import React, { useContext, useEffect } from 'react';
import { AppProps } from './type';
import { Emoji } from './components';
import { EmojiContext } from './providers/EmojiProvider/contexts';
import { SearchIndex } from './helpers';
import { init, getProps } from './config';

function App(props: AppProps) {
  const { data, setData } = useContext(EmojiContext);

  const { set, locale, emojiVersion, emojiSize, skin } = props;

  const initProps: Record<string, any> = getProps(
    {},
    {
      set: {
        value: set
      },
      locale: {
        value: locale
      },
      emojiVersion: {
        value: emojiVersion
      }
    },
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      setData(await init(initProps));
    };

    fetchData().catch(console.error);
  }, [setData, initProps]);

  return (
    <>
      {data &&
        data.categories.map((category: any) =>
          category?.emojis.map((emojiId: string) => {
            const emoji: Record<string, any> = SearchIndex.get(emojiId, data);

            return (
              <Emoji
                cols={data?.sheet.cols}
                emoji={emoji}
                id={emoji.id}
                key={emoji.id}
                rows={data?.sheet.rows}
                set={set}
                size={emojiSize || '24'}
                skin={skin || 1}
              />
            );
          })
        )}
    </>
  );
}

export default App;
