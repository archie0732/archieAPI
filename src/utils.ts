export const toImageUrl = (mediaId: string, page: number, extension: string) => `https://i3.nhentai.net/galleries/${mediaId}/${page.toString()}.${extension}` as const;
export const toThumbnailUrl = (mediaId: string, extension: string) => `https://t3.nhentai.net/galleries/${mediaId}/thumb.${extension}` as const;
export const ImageExtensions = {
  p: 'png',
  j: 'jpg',
  w: 'webp',
  g: 'gif',
};

export const findLang = (data_tags: string): 'jp' | 'zh' | 'en' => {
  const languageMap: Partial<Record<string, 'jp' | 'zh' | 'en'>> = {
    6346: 'jp',
    29963: 'zh',
    12227: 'en',
  };

  const lang = data_tags
    .split(' ')
    .map((tag) => languageMap[tag])
    .find((language) => language);

  return lang || 'jp';
};

export const throwErrorAPI = (sourceWeb: string, status: number, message: string) => {
  return {
    sourceWeb,
    status,
    detail: message,
  };
};
