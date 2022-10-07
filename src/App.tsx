import React, { useEffect, useState } from 'react';
import { Emoji } from './components';
import { init, getProps } from './config';
import { SearchIndex } from './helpers';
import { useEmojiDefaultData } from './providers';

function App() {
  const { emojiDefaultProps } = useEmojiDefaultData();

  const [data, setData] = useState<any>(null);

  const defaultProps = getProps({}, emojiDefaultProps, null);

  useEffect(() => {
    const fetchData = async () => {
      setData(await init(defaultProps));
    };
    fetchData().catch(console.error);
  }, [defaultProps]);

  return (
    <>
      {/* {data &&
        data.categories.map((category: any) =>
          category?.emojis.map((emojiId: string) => {
            const emoji = SearchIndex.get(emojiId, data);

            return ( */}
      {data && (
        <Emoji
          emoji={data.emojis['angel']}
          id={data.emojis['angel'].id}
          key={data.emojis['angel'].id}
          set={defaultProps.set}
          size={defaultProps.emojiSize}
          rows={data?.sheet.rows}
          cols={data?.sheet.cols}
          skin={defaultProps.skin}
          spritesheet={defaultProps.spritesheet}
          getSpritesheetURL={defaultProps.getSpritesheetURL}
        />
      )}
      {/* ); */}
      {/* })
        )} */}
    </>
  );
}

export default App;
