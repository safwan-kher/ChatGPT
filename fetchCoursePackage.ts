import fs from "fs-extra";

const fetchCoursePackage = async () => {
  const enRequest = fetch(
    `https://wordpress.startsteps.org/wp-json/wp/v2/pages?slug=download-course-package`
  );
  const deRequest = fetch(
    `https://wordpress.startsteps.org/wp-json/wp/v2/pages?slug=kursinfos-runterladen&lang=de`
  );

  const [enRes, deRes] = await Promise.all([enRequest, deRequest]);

  if (!enRes.ok || !deRes.ok) {
    console.log(enRes.statusText);
    console.log(deRes.statusText);
    throw new Error(`Error fetching course package`);
  }

  const enJson = await enRes.json();
  const deJson = await deRes.json();

  const enPageId = enJson[0].id;
  const dePageId = deJson[0].id;

  const enAcf = fetch(
    `https://wordpress.startsteps.org/wp-json/acf/v3/pages/${enPageId}`
  );
  const deAcf = fetch(
    `https://wordpress.startsteps.org/wp-json/acf/v3/pages/${dePageId}`
  );

  const [enRes2, deRes2] = await Promise.all([enAcf, deAcf]);

  if (!enRes2.ok || !deRes2.ok) {
    console.log(enRes2.statusText);
    console.log(deRes2.statusText);
    throw new Error(`Error fetching course package ACF`);
  }

  const enJson2 = await enRes2.json();
  const deJson2 = await deRes2.json();

  // downloadoverlay_title,
  // downloadoverlay_input_label,
  // downloadoverlay_button_label,
  // downloadoverlay_download_label,
  // downloadoverlay_download_link,

  const {
    downloadoverlay_download_link: deURL,
    downloadoverlay_download_label: deLabel,
    tech_mentor_file: deTechMetorFileURL,
  } = deJson2.acf;
  const {
    downloadoverlay_download_link: enURL,
    downloadoverlay_download_label: enLabel,
    tech_mentor_file: enTechMetorFileURL,
  } = enJson2.acf;

  fs.writeJSON("./course-package.json", {
    url: {
      de: deURL,
      en: enURL,
    },
    label: {
      de: deLabel,
      en: enLabel,
    },
    techMentorFileUrl: {
      de: deTechMetorFileURL,
      en: enTechMetorFileURL,
    },
  });
};

fetchCoursePackage();
