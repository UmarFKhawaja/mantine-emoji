function set(key: string, value: any) {
  try {
    window.localStorage[`emoji-mart.${key}`] = JSON.stringify(value);
  } catch (error) {
  }
}

function get(key: string) {
  try {
    const value = window.localStorage[`emoji-mart.${key}`];

    if (value) {
      return JSON.parse(value);
    }
  } catch (error) {
  }
}

export const Store = { set, get };
