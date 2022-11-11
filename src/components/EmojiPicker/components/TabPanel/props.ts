import { Dispatch } from 'react';

export type CategoryPanelProps = {
  categories: any;

  set: string;

  size: string;

  skin: number;

  searchedEmojis: any;

  setActiveTab: Dispatch<any>;
  scrollableRef?: any;
  targetRef?: any;
};
