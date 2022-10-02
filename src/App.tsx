import React, { useEffect, useState } from "react";
import "./App.css";
import { Emoji } from "./components";
import { init, Data } from "./config";
import { pickerData } from "./constants";

function App() {
  const [data, setData] = useState<any>(null);

  // const getEmojiByPos = ([p1, p2]: number[]) => {
  //   initGrid();

  //   const emoji = grid[p1] && grid[p1][p2];

  //   if (!emoji) return;
  //   return SearchIndex.get(emoji);
  // };

  useEffect(() => {
    console.log("!before", Data);
    const fetchData = async () => {
      const { emojiVersion, set, locale } = pickerData;
      const fetchEmojis = await init({
        emojiVersion: emojiVersion.value,
        set: set.value,
        locale: locale.value,
      });
      setData(fetchEmojis);
    };

    fetchData().catch(console.error);
    console.log("!after", data);
  }, [data]);
  console.log("!Data", data);
  const emojis = data?.emojis;
  return (
    <>
      {emojis && (
        <Emoji
          emoji={emojis["100"]}
          id={emojis["100"]?.id}
          set={"facebook"}
          size={"24"}
          rows={data?.sheet.rows}
          cols={data?.sheet.cols}
          // skin={1}
          // spritesheet={true}
          // getSpritesheetURL={em.getSpritesheetURL}
        />
      )}
    </>
  );
}

export default App;
