import React, { ReactElement } from "react";
import { EmojiProps } from "./props";
import { SearchIndex } from "../../helpers";

export function Emoji({
  emoji,
  fallback,
  getImageURL,
  getSpritesheetURL,
  id,
  native,
  set,
  shortcodes,
  size,
  skin,
  spritesheet,
  rows,
  cols,
}: EmojiProps): ReactElement {
  if (shortcodes) {
    const matches = shortcodes.match(SearchIndex.SHORTCODES_REGEX);

    if (matches) {
      id = matches[1];

      if (matches[2]) {
        skin = matches[2];
      }
    }
  }

  if (!emoji) {
    emoji = SearchIndex.get(id || native);
  }

  if (!emoji) {
    return <>{fallback}</>;
  }

  const emojiSkin = emoji.skins[skin - 1] || emoji.skins[0];

  const imageSrc =
    emojiSkin.src ||
    (set !== "native" && !spritesheet
      ? typeof getImageURL === "function"
        ? getImageURL(set, emojiSkin.unified)
        : `https://cdn.jsdelivr.net/npm/emoji-datasource-${set}@14.0.0/img/${set}/64/${emojiSkin.unified}.png`
      : undefined);

  console.log("🚀 ~ file: index.tsx ~ line 43 ~ imageSrc", imageSrc);
  const spritesheetSrc =
    typeof getSpritesheetURL === "function"
      ? getSpritesheetURL(set)
      : `https://cdn.jsdelivr.net/npm/emoji-datasource-${set}@14.0.0/img/${set}/sheets-256/64.png`;

  return (
    <span>
      {imageSrc ? (
        <img
          style={{
            height: size || "1em",
            width: "auto",
            display: "inline-block",
            position: "relative",
            top: ".1em",
          }}
          alt={emojiSkin.native || emojiSkin.shortcodes}
          src={imageSrc}
        />
      ) : set === "native" ? (
        <span
          style={{
            fontSize: size,
            fontFamily:
              '"EmojiMart", "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "Android Emoji"',
          }}
        >
          {emojiSkin.native}
        </span>
      ) : (
        <span
          style={{
            display: "block",
            width: size,
            height: size,
            backgroundImage: `url(${spritesheetSrc})`,
            backgroundSize: `${100 * cols}% ${100 * rows}%`,
            backgroundPosition: `${(100 / (cols - 1)) * emojiSkin.x}% ${
              (100 / (rows - 1)) * emojiSkin.y
            }%`,
          }}
        ></span>
      )}
    </span>
  );
}
