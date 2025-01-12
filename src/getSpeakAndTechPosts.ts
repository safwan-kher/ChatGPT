export const getSpeakAndTechPosts = async (
  language: string
): Promise<string[]> => {
  const languageSuffix = language === "en" ? "" : `&lang=${language}`;
  const res = await fetch(
    `https://wordpress.startsteps.org/wp-json/wp/v2/posts?categories=6${languageSuffix}`
  );
  const json = await res.json();
  return json.map((page) => page.slug);
};

export const getSpeakAndTechPost = async (
  language: string,
  slug: string
): Promise<any> => {
  const languageSuffix = language === "en" ? "" : `&lang=${language}`;
  const res = await fetch(
    `https://wordpress.startsteps.org/wp-json/wp/v2/posts?slug=${slug}${languageSuffix}`
  );
  const json = await res.json();
  if (json[0].categories[0] !== 6) {
    throw new Error("Not speak and tech post");
  }
  return json[0];
};
