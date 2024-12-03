import type { Doujin } from "./n.interface";
import type { NAPIError, R7DoujinAPI } from "./r7.interface";

export const doujinAPI = async (id: string | number): Promise<NAPIError | R7DoujinAPI> => {
  const url = `https://nhentai.net/api/gallery/${id}`;
  const resp = await fetch(url);

  if (resp.status !== 200)
    return {
      APIName: "nhentai",
      error: resp.statusText,
      status: resp.status,
    };

  const json = (await resp.json()) as Doujin;
  const imgURL = [];

  for (const index in json.images.pages) {
    const img = json.images.pages[index];
    const extension = img.t == "p" ? "png" : img.t == "j" ? "jpg" : img.t == "w" ? "webp" : "gif";
    imgURL.push(`https://i3.nhentai.net/galleries/${json.media_id}/${+index + 1}.${extension}`);
  }
  const t = json.images.thumbnail.t;
  const e = t == "p" ? "png" : t == "j" ? "jpg" : t == "w" ? "webp" : "gif";

  const r7Tags: { type: string; name: string }[] = [];
  let lang = "japanese",
    artist = "archie";

  const characters = [];
  for (const tag of json.tags) {
    //
    if (tag.type === "language") {
      lang = tag.name;
    } else if (tag.type === "artist") {
      artist = tag.name;
    } else if (tag.type === "character") {
      characters.push(tag.name);
    } else if (tag.type === "tag") {
      const r7Tag = {
        type: tag.type,
        name: tag.name,
      };
      r7Tags.push(r7Tag);
    }
    //
  }

  return {
    id: json.id,
    media_id: json.media_id,
    language: lang,
    artist,
    characters,
    title: json.title,
    pages: imgURL,
    cover: `https://t3.nhentai.net/galleries/${json.media_id}/thumb.${e}`,
    tags: r7Tags,
    count: json.num_pages,
    favorites: json.num_favorites,
  };
};
