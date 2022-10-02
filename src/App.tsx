import React, { useEffect } from 'react';
import './App.css';
import { Emoji } from './components';
import { init, Data, getProps } from './config';
import { pickerData } from './constants';

function App() {
  const defaultProps = getProps({}, pickerData, null);

  useEffect(() => {
    const fetchData = async () => {
      await init(defaultProps);
    };
    fetchData().catch(console.error);
  });

  return (
    <>
      {Data && (
        <Emoji
          emoji={Data.emojis['100']}
          id={Data.emojis['100']?.id}
          set={'facebook'}
          size={'24'}
          rows={Data?.sheet.rows}
          cols={Data?.sheet.cols}
          // skin={1}
          // spritesheet={true}
          // getSpritesheetURL={em.getSpritesheetURL}
        />
      )}
    </>
  );
}

export default App;
