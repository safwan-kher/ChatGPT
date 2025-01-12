import { createEventId } from "./components/Session";

// const subDomain = window.location.hostname === 'staging.startsteps.org' ? 'staging-wp' : 'wordpress';
const subDomain = "wordpress";
const wpBaseURL = `https://${subDomain}.startsteps.org/wp-json`;
import utils from "utils";

// Recaptcha
// const recaptchaApiUrl = 'https://startsteps.org/recaptcha-check.php';
const recaptchaApiUrl = "/api/recaptcha-check";
const recaptchaSiteKey = "6LdKe8kZAAAAAGGy28VytGxoi6PCcD0IpcyNUeN9";

// Eventbrite
const eventbritePrivateToken = "I6DCL4KJGEJBMCSVKEPO";
const eventbriteApiUrl =
  "https://www.eventbriteapi.com/v3/organizations/31121003697/events/";

const api = {
  getBlogPosts(language: "en" | "de") {
    const languageSuffix = language === "en" ? "" : `&lang=${language}`;
    const category = language === "en" ? 1 : 2;
    return new Promise((resolve, reject) => {
      fetch(
        `${wpBaseURL}/wp/v2/posts?categories=${category}&per_page=100${languageSuffix}`
      )
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getBlogPost(language: "en" | "de", slug: string) {
    const languageSuffix = language === "en" ? "" : `&lang=${language}`;
    return new Promise((resolve, reject) => {
      fetch(`${wpBaseURL}/wp/v2/posts?slug=${slug}${languageSuffix}`)
        .then((response) => response.json())
        .then((data) => {
          resolve(data[0] || {});
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async getCompassWidget(language: "en" | "de"): Promise<any> {
    const languageSuffix = language === "en" ? "" : `&lang=${language}`;
    const compassWidgetPageResponse = await fetch(
      `${wpBaseURL}/wp/v2/pages?slug=compass-widget${languageSuffix}`
    );
    const compassWidgetPage = await compassWidgetPageResponse.json();
    const acfId = compassWidgetPage[0].id;
    const acfResponse = await fetch(`${wpBaseURL}/acf/v3/pages/${acfId}`);
    const acf = await acfResponse.json();
    return acf.acf;
  },
  async getBootcampSlugs() {
    const result = await fetch(
      `${wpBaseURL}/wp/v2/pages?slug=bootcamps-we-work-with`
    );
    const pageData = await result.json();
    const bootcampsAcf = await fetch(
      `${wpBaseURL}/acf/v3/pages/${pageData[0].id}`
    );
    const bootcampsData = await bootcampsAcf.json();
    // console.log(JSON.stringify(bootcampsData, null, 2))
    return bootcampsData.acf.bootcamps.map(
      (bootcamp: any) => bootcamp.post_name
    );
  },
  async getBootcamps(language = "en") {
    const result = await fetch(
      `${wpBaseURL}/wp/v2/pages?slug=bootcamps-we-work-with${
        language === "en" ? "" : `&lang=${language}`
      }`
    );
    const pageData = await result.json();
    const bootcampsAcf = await fetch(
      `${wpBaseURL}/acf/v3/pages/${pageData[0].id}`
    );
    const bootcampsData = await bootcampsAcf.json();
    const bootCampPageRequests: any = await Promise.all(
      bootcampsData.acf.bootcamps.map(
        async (bootcamp) =>
          await {
            res: await fetch(`${wpBaseURL}/acf/v3/pages/${bootcamp.ID}`),
            slug: bootcamp.post_name,
          }
      )
    );

    const bootcampsJson: any = await Promise.all(
      bootCampPageRequests.map(
        async (pageResult) =>
          await { data: await pageResult.res.json(), slug: pageResult.slug }
      )
    );
    const bootcamps = bootcampsJson.map((dataAndSlug) => ({
      bootcamp: dataAndSlug.data.acf,
      slug: dataAndSlug.slug,
    }));

    return {
      pageTitle: api.unescapeHtml(pageData[0].title.rendered),
      pageDescription: api.unescapeHtml(
        utils.cleanText(pageData[0].content.rendered)
      ),
      bootcamps: bootcamps,
      new_title: bootcampsData.acf.new_title,
      new_title_2: bootcampsData.acf.new_title_2,
      subtitle: bootcampsData.acf.subtitle,
      subtitle_2: bootcampsData.acf.subtitle_2,
      description: bootcampsData.acf.new_content,
      new_image: bootcampsData.acf.new_image,
      bootcampsListTitle: bootcampsData.acf.bootcamps_list_title,
    };
  },
  async getProfessionalCertificates(language) {
    const languageSuffix = language === "en" ? "" : `&lang=${language}`;
    const result = await fetch(
      `${wpBaseURL}/wp/v2/pages?slug=professional-certificates${languageSuffix}`
    );
    const pageData = await result.json();
    const bootcampsAcf = await fetch(
      `${wpBaseURL}/acf/v3/pages/${pageData[0].id}`
    );
    const bootcampsData = await bootcampsAcf.json();
    const bootCampPageRequests: any = await Promise.all(
      bootcampsData.acf.bootcamps.map(
        async (bootcamp) =>
          await {
            res: await fetch(`${wpBaseURL}/acf/v3/pages/${bootcamp.ID}`),
            slug: bootcamp.post_name,
          }
      )
    );

    const bootcampsJson: any = await Promise.all(
      bootCampPageRequests.map(
        async (pageResult) =>
          await { data: await pageResult.res.json(), slug: pageResult.slug }
      )
    );
    const bootcamps = bootcampsJson.map((dataAndSlug) => ({
      bootcamp: dataAndSlug.data.acf,
      slug: dataAndSlug.slug,
    }));

    return {
      bootcamps: bootcamps,
      title: bootcampsData.acf.title,
      content: bootcampsData.acf.content,
      image: bootcampsData.acf.image,
      bootcampsListTitle: bootcampsData.acf.bootcamps_list_title,
      bootcampsListDescription: bootcampsData.acf.bootcamps_list_description,
    };
  },
  unescapeHtml: (text: string): string => {
    return text
      .replace(/&#8211;/, "–")
      .replace(/&nbsp;/, " ")
      .replace(/&#038;/, "&");
  },
  async getLandingPage(slug: string, language: string): Promise<any> {
    const languageSuffix = language === "en" ? "" : `&lang=${language}`;
    const res = await fetch(
      `${wpBaseURL}/wp/v2/posts?slug=${slug}${languageSuffix}`
    );
    const json = await res.json();
    if (![4, 5].includes(json[0].categories[0])) {
      throw new Error("Not landing page");
    }
    return json[0];
  },
  async getLandingPages(language: string): Promise<string[]> {
    const languageSuffix = language === "en" ? "" : `&lang=${language}`;
    const res = await fetch(
      `${wpBaseURL}/wp/v2/posts?categories=4${languageSuffix}`
    );
    const json = await res.json();
    return json.map((page) => page.slug);
  },
  getContent(slug: string, language = "en", skipTitle = false) {
    const languageSuffix = language === "en" ? "" : `&lang=${language}`;
    return new Promise((resolve, reject) => {
      // Find page by slug
      fetch(`${wpBaseURL}/wp/v2/pages?slug=${slug}${languageSuffix}`)
        .then((response) => response.json())
        .then((data) => {
          const page = data[0];
          if (page && page.id) {
            // Get Advanced Custom Fields for this page
            fetch(`${wpBaseURL}/acf/v3/pages/${page.id}`)
              .then((response) => response.json())
              .then((data) => {
                resolve({
                  content: data.acf,
                  title: api.unescapeHtml(page.title.rendered),
                  description: api.unescapeHtml(
                    utils.cleanText(page.content.rendered, true, true)
                  ),
                });
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            reject(`No page found for slug ${slug}.`);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  async trackFbEvent({
    eventName,
    externalId,
    firstName,
    lastName,
    email,
    phone,
    country,
    city,
    customDataObj,
    customEvent,
  }: {
    eventName: string;
    externalId: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: any;
    country?: string;
    city?: string;
    customDataObj: {
      [key: string]: string | number | boolean;
    };
    customEvent?: boolean;
  }): Promise<void> {
    try {
      const eventId = createEventId();
      (window as any).fbq(
        customEvent ? "trackCustom" : "track",
        eventName,
        { ...(eventName === "Purchase" && { currency: "EUR", value: 500 }) },
        {
          eventID: eventId,
        }
      );
      await fetch("/api/fb", {
        method: "POST",
        body: JSON.stringify({
          eventName,
          externalId,
          firstName,
          lastName,
          email,
          phone,
          country,
          city,
          customDataObj,
          userAgent: navigator.userAgent || "",
          // TODO: Strip parameters possibly if it causes issues
          eventSourceUrl: window.location.href,
          eventId: eventId,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.error(e);
    }
  },
  // getStages() {
  //   fetch(
  //     `https://api.pipedrive.com/v1/stages/?api_token=${process.env.PIPEDRIVE_API_KEY}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data.data);
  //     });
  //   fetch(
  //     `https://api.pipedrive.com/v1/pipelines/?api_token=${process.env.PIPEDRIVE_API_KEY}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data.data);
  //     });
  // },
  // getCustomFields() {
  //   fetch(
  //     `https://api.pipedrive.com/v1/personFields/?api_token=${process.env.PIPEDRIVE_API_KEY}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data.data);
  //     });
  //   fetch(
  //     `https://api.pipedrive.com/v1/dealFields/?api_token=${process.env.PIPEDRIVE_API_KEY}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data.data);
  //     });
  // },
  async updatePerson(id: string, data: object): Promise<void> {
    await fetch("/api/update-person", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        ...data,
      }),
    });
  },
  async addPerson(
    first_name: string,
    last_name: string,
    email: string,
    customFields: any,
    formType = "",
    setPipedriveStage: number,
    customEvent?: string
  ): Promise<string> {
    await this.recaptchaCheck();
    const res = await fetch("/api/create-person-and-deal", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${first_name} ${last_name}`,
        email: [email],
        stageId: setPipedriveStage,
        ...customFields,
        ...(customFields.phone && { phone: [customFields.phone] }),
      }),
    });
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: customEvent || "formSubmission",
      formType,
    });
    const parsedRes = await res.json();
    return parsedRes.personId;
  },
  recaptchaCheck(): Promise<void> {
    return new Promise((resolve, reject) => {
      (window as any).grecaptcha.ready(() => {
        (window as any).grecaptcha
          .execute(recaptchaSiteKey, { action: "submit" })
          .then((token: any) => {
            fetch(recaptchaApiUrl, {
              method: "POST",
              cache: "no-cache",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token,
              }),
            })
              .then((response) => response.json())
              .then((response) => {
                if (response.error) {
                  reject(response.error);
                } else if (response.score >= 0.5) {
                  resolve();
                } else {
                  reject("Something went wrong in recaptchaCheck");
                }
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((error: any) => {
            reject(error);
          });
      });
    });
  },
  getEvents(): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(eventbriteApiUrl, {
        mode: "cors",
        cache: "no-cache",
        headers: {
          Authorization: `Bearer ${eventbritePrivateToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
export default api;
