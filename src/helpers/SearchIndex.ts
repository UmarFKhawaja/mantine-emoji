import i18n_en from '@emoji-mart/data/i18n/en.json';
import {
  EmojiSet,
  EmojiVersion,
  Locale,
  MaxFrequentRows,
  PerLine
} from '../constants';
import { FrequentlyUsed } from './FrequentlyUsed';
import { NativeSupport } from './NativeSupport';
import { SafeFlags } from './SafeFlags';

const SHORTCODES_REGEX = /^:([^:]+):(?::skin-tone-(\d):)?$/;

let Pool: any = null;
let I18n: any = null;
export let Data: any = null;

function get(emojiId: any, data?: any) {
  if (emojiId.id) {
    return emojiId;
  }

  return (
    data.emojis[emojiId] ||
    data.emojis[data.aliases[emojiId]] ||
    data.emojis[data.natives[emojiId]]
  );
}

function reset() {
  Pool = null;
}

async function search(
  value: string,
  { maxResults, caller }: { maxResults?: number; caller?: any } = {}
) {
  if (!value || !value.trim().length) {
    return null;
  }

  maxResults = maxResults || 90;

  await init(null, { caller: caller || 'SearchIndex.search' });

  const values = value
    .toLowerCase()
    .replace(/(\w)-/, '$1 ')
    .split(/[\s|,]+/)
    .filter((word: string, i: number, words: string[]) => {
      return word.trim() && words.indexOf(word) === i;
    });

  if (!values.length) {
    return;
  }

  let pool = Pool || (Pool = Object.values(Data.emojis));
  let results: any[] = [];
  let scores: any = null;

  for (const value of values) {
    if (!pool.length) {
      break;
    }

    results = [];
    scores = {};

    for (const emoji of pool) {
      if (!emoji.search) {
        continue;
      }

      const score = emoji.search.indexOf(`,${value}`);

      if (score === -1) {
        continue;
      }

      results.push(emoji);

      if (!scores[emoji.id]) {
        scores[emoji.id] = 0;
      }

      scores[emoji.id] += emoji.id === value ? 0 : score + 1;
    }

    pool = results;
  }

  if (results.length < 2) {
    return results;
  }

  results.sort((a, b) => {
    const aScore = scores[a.id];
    const bScore = scores[b.id];

    if (aScore === bScore) {
      return a.id.localeCompare(b.id);
    }

    return aScore - bScore;
  });

  if (results.length > maxResults) {
    results = results.slice(0, maxResults);
  }

  return results;
}

let promise: any = null;
let initCallback: any = null;
let initialized: any = false;

function init(options: any, { caller }: { caller?: any } = {}) {
  if (!promise) {
    promise = new Promise((resolve) => {
      initCallback = resolve;
    });
  }

  if (options) {
    _init(options).then();
  } else if (caller && !initialized) {
    console.warn(
      `\`${caller}\` requires data to be initialized first. Promise will be pending until \`init\` is called.`
    );
  }

  return promise;
}

const fetchCache: any = {};

async function fetchJSON(src: string): Promise<any> {
  if (fetchCache[src]) {
    return fetchCache[src];
  }

  const response = await fetch(src);

  const json = await response.json();

  fetchCache[src] = json;

  return json;
}

async function _init(props: any) {
  initialized = true;

  let { emojiVersion, set, locale } = props;

  if (!emojiVersion) {
    emojiVersion = EmojiVersion;
  }

  if (!set) {
    set = EmojiSet;
  }

  if (!locale) {
    locale = Locale;
  }

  if (!Data) {
    Data =
      (typeof props.data === 'function' ? await props.data() : props.data) ||
      (await fetchJSON(
        `https://cdn.jsdelivr.net/npm/@emoji-mart/data@latest/sets/${emojiVersion}/${set}.json`
      ));

    Data.emoticons = {};
    Data.natives = {};

    Data.categories.unshift({
      id: 'frequent',
      emojis: []
    });

    for (const alias in Data.aliases) {
      const emojiId = Data.aliases[alias];
      const emoji = Data.emojis[emojiId];

      if (!emoji) {
        continue;
      }

      emoji.aliases || (emoji.aliases = []);
      emoji.aliases.push(alias);
    }
  } else {
    Data.categories = Data.categories.filter((c: any) => {
      const isCustom = !!c.name;

      return !isCustom;
    });
  }

  I18n =
    (typeof props.i18n === 'function' ? await props.i18n() : props.i18n) ||
    (locale === 'en'
      ? i18n_en
      : await fetchJSON(
          `https://cdn.jsdelivr.net/npm/@emoji-mart/data@latest/i18n/${locale}.json`
        ));

  if (props.custom) {
    for (let x in props.custom) {
      const i: number = parseInt(x);
      const category = props.custom[i];
      const prevCategory = props.custom[i - 1];

      if (!category.emojis || !category.emojis.length) {
        continue;
      }

      if (!category.id) {
        category.id = `custom_${i + 1}`;
      }

      if (!category.name) {
        category.name = I18n.categories.custom;
      }

      if (prevCategory && !category.icon) {
        category.target = prevCategory.target || prevCategory;
      }

      Data.categories.push(category);

      for (const emoji of category.emojis) {
        Data.emojis[emoji.id] = emoji;
      }
    }
  }

  if (props.categories) {
    Data.categories = Data.categories
      .filter((c: any) => {
        return props.categories.indexOf(c.id) !== -1;
      })
      .sort((c1: any, c2: any) => {
        const i1 = props.categories.indexOf(c1.id);
        const i2 = props.categories.indexOf(c2.id);

        return i1 - i2;
      });
  }

  let latestVersionSupport = null;
  let noCountryFlags = null;
  if (set === 'native') {
    latestVersionSupport = NativeSupport.latestVersion();
    noCountryFlags = props.noCountryFlags || NativeSupport.noCountryFlags();
  }

  let categoryIndex = Data.categories.length;
  let resetSearchIndex = false;
  while (categoryIndex--) {
    const category = Data.categories[categoryIndex];

    if (category.id === 'frequent') {
      let { maxFrequentRows, perLine } = props;

      if (!maxFrequentRows) {
        maxFrequentRows = MaxFrequentRows;
      }

      if (!perLine) {
        perLine = PerLine;
      }

      category.emojis = FrequentlyUsed.get({ maxFrequentRows, perLine });
    }

    if (!category.emojis || !category.emojis.length) {
      Data.categories.splice(categoryIndex, 1);

      continue;
    }

    const { categoryIcons } = props;

    if (categoryIcons) {
      const icon = categoryIcons[category.id];

      if (icon && !category.icon) {
        category.icon = icon;
      }
    }

    let emojiIndex = category.emojis.length;

    while (emojiIndex--) {
      const emojiId = category.emojis[emojiIndex];
      const emoji = emojiId.id ? emojiId : Data.emojis[emojiId];

      if (!emoji) {
        category.emojis.splice(emojiIndex, 1);

        continue;
      }

      if (latestVersionSupport && emoji.version > latestVersionSupport) {
        category.emojis.splice(emojiIndex, 1);

        continue;
      }

      if (noCountryFlags && category.id === 'flags') {
        if (!SafeFlags.includes(emoji.id)) {
          category.emojis.splice(emojiIndex, 1);

          continue;
        }
      }

      if (!emoji.search) {
        resetSearchIndex = true;
        emoji.search =
          ',' +
          [
            [emoji.id, false],
            [emoji.name, true],
            [emoji.keywords, false],
            [emoji.emoticons, false]
          ]
            .map(([strings, split]) => {
              if (!strings) {
                return [];
              }

              return (Array.isArray(strings) ? strings : [strings])
                .map((string) => {
                  return (split ? string.split(/[-|_\s]+/) : [string]).map(
                    (s: string) => s.toLowerCase()
                  );
                })
                .flat();
            })
            .flat()
            .filter((a) => a && a.trim())
            .join(',');

        if (emoji.emoticons) {
          for (const emoticon of emoji.emoticons) {
            if (Data.emoticons[emoticon]) continue;
            Data.emoticons[emoticon] = emoji.id;
          }
        }

        let skinIndex = 0;

        for (const skin of emoji.skins) {
          if (!skin) {
            continue;
          }

          skinIndex++;

          const { native } = skin;

          if (native) {
            Data.natives[native] = emoji.id;
            emoji.search += `,${native}`;
          }

          const skinShortcodes =
            skinIndex === 1 ? '' : `:skin-tone-${skinIndex}:`;

          skin.shortcodes = `:${emoji.id}:${skinShortcodes}`;
        }
      }
    }
  }

  if (resetSearchIndex) {
    reset();
  }

  initCallback();
}

export const SearchIndex = { search, get, reset, SHORTCODES_REGEX };
