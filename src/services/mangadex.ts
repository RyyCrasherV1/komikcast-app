const BASE_URL = "https://api.mangadex.org";

export async function getMangaList(limit = 20, offset = 0) {
  try {
    console.log("Fetching MangaDex...");

    const res = await fetch(
      `${BASE_URL}/manga?limit=${limit}&offset=${offset}&includes[]=cover_art`
    );

    console.log("Status:", res.status);

    const json = await res.json();
    console.log("Response:", json);

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
        coverId: coverRel?.attributes?.fileName,
      };
    });
  } catch (e) {
    console.error("MangaDex error:", e);
    return [];
  }
}
