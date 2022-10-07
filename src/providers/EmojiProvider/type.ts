export type EmojiProviderType = {
  autoFocus: { value: boolean };

  emojiButtonColors: { value: String | null };

  emojiButtonRadius: { value: String };

  emojiButtonSize: { value: Number };

  emojiSize: { value: Number };

  emojiVersion: { value: Number; choices: Number[] };

  icons: { value: String; choices: String[] };

  locale: { value: String; choices: String[] };

  maxFrequentRows: { value: Number };

  navPosition: { value: String; choices: String[] };

  noCountryFlags: { value: Boolean };

  noResultsEmoji: { value: String | null };

  perLine: { value: Number };

  previewEmoji: { value: String | null };

  previewPosition: { value: String; choices: String[] };

  searchPosition: { value: String; choices: String[] };

  set: { value: String; choices: String[] };

  skin: { value: Number; choices: Number[] };

  skinTonePosition: { value: String; choices: String[] };

  theme: { value: String; choices: String[] };

  // Data
  categories: String | null;

  categoryIcons: String | null;

  custom: String | null;

  data: String | null;

  i18n: String | null;

  // Callbacks
  getImageURL: String | null;

  getSpritesheetURL: String | null;

  onAddCustomEmoji: String | null;

  onClickOutside: String | null;

  onEmojiSelect: String | null;

  // Deprecated
  stickySearch: { value: Boolean; deprecated: Boolean };
};
