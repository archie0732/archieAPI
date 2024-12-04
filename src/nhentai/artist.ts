import { load } from 'cheerio';
import { findLang } from '../utils';

import type { NAPIError, R7NView } from './r7.interface';

export const artistAPI = async (artist: string) => {
  const url = `https://nhentai.net/artist/${artist.replaceAll(' ', '-')}/`;
  const resp = await fetch(url);

  if (resp.status !== 200) {
    return {
      APIName: 'nhentai',
      error: resp.statusText,
      status: resp.status,
    } as NAPIError;
  }
  const html = await resp.text();
  const $ = load(html);
  const doujin: R7NView[] = [];

  $('.gallery').each((_, element) => {
    const s = $(element).attr('data-tags') || '6346';
    const lang = findLang(s);

    doujin.push({
      title: $(element).find('.caption').text() || 'unknow',
      id: $(element).find('a.cover').attr('href')?.split('/')[2] || '541764',
      cover: $(element).find('img').attr('data-src') || 'https://t3.nhentai.net/galleries/3131694/thumb.webp',
      lang,
    });
  });

  return doujin;
};
