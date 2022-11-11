export const EmojiVersion: number = 14;

export const EmojiSize: string = '24';

export const EmojiSet: string = 'native';

export const Locale: string = 'en';

export const MaxFrequentRows: number = 4;

export const PerLine: number = 9;

export const EmojiSkin: number = 1;

export const Icons: string = 'auto';

export const THEME_ICONS: any = {
  light: 'outline',
  dark: 'solid'
};

export const pickerData = {
  autoFocus: {
    value: false
  },
  emojiButtonColors: {
    value: null
  },
  emojiButtonRadius: {
    value: '100%'
  },
  emojiButtonSize: {
    value: 36
  },
  emojiSize: {
    value: 24
  },
  emojiVersion: {
    value: 14,
    choices: [1, 2, 3, 4, 5, 11, 12, 12.1, 13, 13.1, 14]
  },
  icons: {
    value: 'auto',
    choices: ['auto', 'outline', 'solid']
  },
  locale: {
    value: 'en',
    choices: [
      'en',
      'ar',
      'cs',
      'de',
      'es',
      'fa',
      'fi',
      'fr',
      'it',
      'ja',
      'nl',
      'pl',
      'pt',
      'ru',
      'uk',
      'zh'
    ]
  },
  maxFrequentRows: {
    value: 4
  },
  navPosition: {
    value: 'top',
    choices: ['top', 'bottom', 'none']
  },
  noCountryFlags: {
    value: false
  },
  noResultsEmoji: {
    value: null
  },
  perLine: {
    value: 9
  },
  previewEmoji: {
    value: null
  },
  previewPosition: {
    value: 'bottom',
    choices: ['top', 'bottom', 'none']
  },
  searchPosition: {
    value: 'sticky',
    choices: ['sticky', 'static', 'none']
  },
  set: {
    value: 'facebook',
    choices: ['native', 'apple', 'facebook', 'google', 'twitter']
  },
  skin: {
    value: 1,
    choices: [1, 2, 3, 4, 5, 6]
  },
  skinTonePosition: {
    value: 'preview',
    choices: ['preview', 'search', 'none']
  },
  theme: {
    value: 'auto',
    choices: ['auto', 'light', 'dark']
  },

  // Data
  categories: null,
  categoryIcons: null,
  custom: null,
  data: null,
  i18n: null,

  // Callbacks
  getImageURL: null,
  getSpritesheetURL: null,
  onAddCustomEmoji: null,
  onClickOutside: null,
  onEmojiSelect: null,

  // Deprecated
  stickySearch: {
    deprecated: true,
    value: true
  }
};

export const CategoriesTitle: Record<string, string> = {
  activity: 'Activity',
  flags: 'Flags',
  foods: 'Food & Drink',
  frequent: 'Frequently used',
  nature: 'Animals & Nature',
  objects: 'Objects',
  people: 'Smileys & People',
  places: 'Travel & Places',
  symbols: 'Symbols'
};

export const CategoriesScrollAxis: Record<string, number> = {
  frequent: 0,
  people: 213.6,
  nature: 2920.8,
  foods: 3695.08,
  activity: 4416.8,
  places: 4893.8,
  objects: 6045.6,
  symbols: 7380.2,
  flags: 8560.2
};
