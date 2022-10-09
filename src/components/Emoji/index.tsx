import React, { ReactElement } from 'react';
import { EmojiProps } from './props';
import { SearchIndex } from '../../helpers';

export function Emoji({
  emoji,
  fallback,
  id,
  native,
  shortcodes,
  size,
  skin
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

  return (
    <span
      style={{
        fontSize: `${size}px`,
        fontFamily:
          '"EmojiMart", "Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "Android Emoji"'
      }}>
      {emojiSkin.native}
    </span>
  );
}
