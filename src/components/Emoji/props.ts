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

  getImageURL?: any;
  getSpritesheetURL?: any;
}
