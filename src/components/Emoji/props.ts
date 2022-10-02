export interface EmojiProps {
  emoji: any;
  id?: string;
  fallback?: string;
  native?: string;
  shortcodes?: string;
  size?: string;
  set?: any;
  skin?: any;
  spritesheet?: any;
  rows: number;
  cols: number;

  getImageURL?: any;
  getSpritesheetURL?: any;
}
