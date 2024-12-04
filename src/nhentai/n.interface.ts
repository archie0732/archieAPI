export interface Doujin {
  id: number;
  media_id: string;
  title: {
    english: string;
    japanese: string;
    pretty: string;
  };
  images: {
    pages: Page[];
    cover: Page;
    thumbnail: Page;
  };
  scanlator: string;
  upload_date: number;
  tags: Tags[];
  num_pages: number;
  num_favorites: number;
}

export interface Page {
  t: 'p' | 'j' | 'w' | 'g';
  w: number;
  h: number;
}

export interface Tags {
  id: number;
  type: string;
  name: string;
  url: string;
  count: number;
}
