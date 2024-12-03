export interface Doujin {
  id: number;
  media_id: number;
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
  t: string;
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
