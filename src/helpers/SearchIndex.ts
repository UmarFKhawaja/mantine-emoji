const SHORTCODES_REGEX = /^:([^:]+):(?::skin-tone-(\d):)?$/;

let Pool: any = null;
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
  data: any,
  { maxResults }: { maxResults?: number } = {}
) {
  if (!value || !value.trim().length) {
    return null;
  }

  maxResults = maxResults || 90;

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

  let pool = Pool || (Pool = Object.values(data.emojis));
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

export const SearchIndex = { search, get, reset, SHORTCODES_REGEX };
