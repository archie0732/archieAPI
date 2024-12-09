import { load } from 'cheerio';
import { R7APIError, type R7NView } from './r7.interface';
import { findLang } from '../utils';

export const homePage = async () => {
  const resp = await fetch('https://nhentai.net');

  if (resp.status !== 200) {
    throw new R7APIError('nhentai', resp.status, resp.statusText);
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

await homePage();
