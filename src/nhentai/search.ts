import { toThumbnailUrl, ImageExtensions, findLang } from '../utils';
import type { Doujin } from './n.interface';
import type { NAPIError, R7NView } from './r7.interface';

export const doiujinSearchAPI = async (keyword: string) => {
  keyword = keyword.replaceAll(' ', '%20');
  const resp = await fetch(`https://nhentai.net/api/galleries/search?query=${keyword}`);

  if (resp.status !== 200) {
    return {
      APIName: 'nhentai',
      error: 'while try to fetch search api',
      status: resp.status,
    } as NAPIError;
  }

  const json = await resp.json() as { result: Doujin[] };
  const doujinlist: R7NView[] = [];
  for (const doujin of json.result) {
    let lang: 'jp' | 'en' | 'zh' = 'jp';

    for (const tag of doujin.tags) {
      if (tag.type === 'language') {
        lang = findLang(tag.name);
      }
    }

    doujinlist.push({
      title: doujin.title.pretty,
      id: doujin.id.toString(),
      cover: toThumbnailUrl(doujin.media_id, ImageExtensions[doujin.images.cover.t]),
      lang,
    });
  }
  return doujinlist;
};
