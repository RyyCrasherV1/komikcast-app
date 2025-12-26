const BASE_URL = "https://api.mangadex.org";

export async function getMangaList(limit = 20, offset = 0) {
  const url = `${BASE_URL}/manga?limit=${limit}&offset=${offset}&includes[]=cover_art&contentRating[]=safe&contentRating[]=suggestive&order[latestUploadedChapter]=desc`;

  const res = await fetch(url);
  const json = await res.json();

  return json.data.map((item: any) => {
    const title =
      item.attributes.title.en ||
      Object.values(item.attributes.title)[0];

    const coverRel = item.relationships.find(
      (rel: any) => rel.type === "cover_art"
    );

    return {
      id: item.id,
      title,
      description:
        item.attributes.description.en ||
        Object.values(item.attributes.description)[0] ||
        "",
      status: item.attributes.status,
      year: item.attributes.year,
      coverId: coverRel?.id,
    };
  });
}
