import { load } from "cheerio";
import type { NAPIError, R7NArtist } from "./r7.interface";

export const artistAPI = async (artist: string) => {
  const url = `https://nhentai.net/artist/${artist.replaceAll(" ", "-")}/`;
  const resp = await fetch(url);

  if (resp.status !== 200) {
    return {
      APIName: "nhentai",
      error: resp.statusText,
      status: resp.status,
    } as NAPIError;
  }
  const html = await resp.text();
  const $ = load(html);
  const doujin: R7NArtist[] = [];
  $(".gallery").each((_, element) => {
    const s = $(element).attr("data-tags") || "6346";
    const lang = findLang(s);

    doujin.push({
      title: $(element).find(".caption").text() || "unknow",
      id: $(element).find("a.cover").attr("href")?.split("/")[2] || "541764",
      cover: $(element).find("img").attr("data-src") || "https://t3.nhentai.net/galleries/3131694/thumb.webp",
      lang,
    });
  });

  return doujin;
};

const findLang = (data_tags: string): "jp" | "ch" | "en" => {
  const languageMap: Record<string, "jp" | "ch" | "en"> = {
    "6346": "jp",
    "29963": "ch",
    "12227": "en",
  };

  const lang = data_tags
    .split(" ")
    .map((tag) => languageMap[tag])
    .find((language) => language);

  return lang || "jp";
};
