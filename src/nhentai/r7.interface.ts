export interface NAPIError {
  APIName: 'nhentai';
  error: string;
  status: number;
}

export interface R7APIDoujinData {
  id: number;
  mediaId: string;
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
  tags: string[];
  favorites: number;
}

export interface R7NView {
  title: string;
  id: string;
  cover: string;
  lang: 'jp' | 'zh' | 'en';
}

export class R7APIError extends Error {
  status: number;
  arg: unknown;
  constructor(message: string, status: number, arg: unknown) {
    super(message);
    this.message = message;
    this.status = status;
    this.arg = arg;
  }
}
