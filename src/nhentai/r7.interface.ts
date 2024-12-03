export interface NAPIError {
  APIName: "nhentai";
  error: string;
  status: number;
}

export interface R7DoujinAPI {
  id: number;
  media_id: number;
  language: string;
  artist: string;
  characters: string[];
  title: {
    japanese: string;
    english: string;
    pretty: string;
  };
  pages: string[];
  cover: string;
  tags: {
    type: string;
    name: string;
  }[];
  favorites: number;
  count: number;
}

export interface R7NArtist {
  title: string;
  id: string;
  cover: string;
  lang: "jp" | "ch" | "en";
}
