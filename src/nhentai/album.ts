import { toImageUrl, toThumbnailUrl, ImageExtensions } from '../utils';
import type { Doujin } from './n.interface';
import type { NAPIError, R7APIDoujinData } from './r7.interface';

export const doujinAPI = async (id: string): Promise<NAPIError | R7APIDoujinData> => {
  const url = `https://nhentai.net/api/gallery/${id}`;
  const resp = await fetch(url);

  if (resp.status !== 200)
    return {
      APIName: 'nhentai',
      error: resp.statusText,
      status: resp.status,
    };

  const json = (await resp.json()) as Doujin;
  const imgURL = [];

  for (let i = 0, n = json.images.pages.length; i < n; i++) {
    const image = json.images.pages[i];

    imgURL.push(toImageUrl(json.media_id, i + 1, ImageExtensions[image.t]));
  }

  const e = ImageExtensions[json.images.thumbnail.t];

  const r7Tags: string[] = [];

  let lang = 'japanese';
  let artist = 'archie';

  const characters = [];

  for (const tag of json.tags) {
    if (tag.type === 'language') {
      lang = tag.name;
    }
    else if (tag.type === 'artist') {
      artist = tag.name;
    }
    else if (tag.type === 'character') {
      characters.push(tag.name);
    }
    else if (tag.type === 'tag') {
      r7Tags.push(tag.name);
    }
  }

  return {
    id: json.id,
    mediaId: json.media_id,
    title: json.title,
    artist,
    pages: imgURL,
    language: lang,
    characters,
    tags: r7Tags,
    cover: toThumbnailUrl(json.media_id, e),
    favorites: json.num_favorites,
  };
};
