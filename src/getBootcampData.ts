export const getBootcampData = async (slug: string, locale: string) => {
  try {
    const res = await fetch(
      `https://wordpress.startsteps.org/wp-json/wp/v2/pages?slug=${slug}${
        locale === "en" ? "" : `&lang=${locale}`
      }`
    );
    const json = await res.json();
    return {
      name: json[0].acf.partner_name,
      logo: json[0].acf.partner_logo,
      slug: slug,
    };
  } catch (e) {
    console.error(
      `Unable to find bootcamp data with slug: ${slug} on locale: ${locale}`
    );
    throw e;
  }
};
