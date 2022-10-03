import React, { useEffect, useState } from 'react';
import './App.css';
import { Emoji } from './components';
import { init, getProps } from './config';
import { pickerData } from './constants';
import { SearchIndex } from './helpers';

function App() {
  const [data, setData] = useState<any>(null);
  const defaultProps = getProps({}, pickerData, null);

  useEffect(() => {
    const fetchData = async () => {
      setData(await init(defaultProps));
    };
    fetchData().catch(console.error);
  }, [defaultProps]);

  return (
    <>
      {data &&
        data.categories.map((category: any) =>
          category?.emojis.map((emojiId: string) => {
            const emoji = SearchIndex.get(emojiId, data);

            return (
              <Emoji
                emoji={emoji}
                id={emojiId}
                key={emojiId}
                set={defaultProps.set}
                size={defaultProps.emojiSize}
                rows={data?.sheet.rows}
                cols={data?.sheet.cols}
                skin={defaultProps.skin}
                spritesheet={defaultProps.spritesheet}
                getSpritesheetURL={defaultProps.getSpritesheetURL}
              />
            );
          })
        )}
    </>
  );
}

export default App;
