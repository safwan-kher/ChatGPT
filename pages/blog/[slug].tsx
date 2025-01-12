import React, { FC } from "react";
import { NextSeo } from "next-seo";
import Head from "next/head";

import utils from "../../src/utils";
import api from "../../src/api";
import { IGetLayout } from "../../src/components/DefaultLayout";
import { InferGetStaticPropsType, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { jsonLdScriptProps } from "react-schemaorg";

const Partner: FC<
  InferGetStaticPropsType<typeof getStaticProps> & { getLayout: IGetLayout }
> = ({ content, author }) => {
  const router = useRouter();
  const locale = router.locale === "en" ? "en" : "de";
  const shareUrl = `https://startsteps.org/${locale}${router.asPath}`;
  const baseUrlWithLanguage = `https://startsteps.org/${locale}`;

  return (
    <article>
      <NextSeo
        description={utils.cleanText(content.excerpt.rendered, true, true)}
        canonical={`https://startsteps.org/${locale}${router.asPath}`}
        openGraph={{
          type: "Article",
          title: `${content.title.rendered} — StartSteps: Digital Skills & the Jobs of the Future`,
          description: utils.cleanText(content.excerpt.rendered, true, true),
          article: {
            publishedTime: content.date,
          },
          images: content.acf.image
            ? [
                {
                  url: content.acf.image.url,
                  width: content.acf.image.width,
                  height: content.acf.image.height,
                  alt: content.acf.image.alt,
                },
              ]
            : [],
        }}
      />
      <Head>
        <script
          {...jsonLdScriptProps({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": `${shareUrl}/#/organization`,
                name: "StartSteps Digital Education",
                url: baseUrlWithLanguage,
                sameAs: [
                  "https://www.linkedin.com/school/startsteps/",
                  "https://www.instagram.com/startsteps_germany/",
                  "https://www.facebook.com/startsteps",
                ],
                logo: {
                  "@type": "ImageObject",
                  "@id": "https://startsteps.org/logo.png/#/logo",
                  url: "https://startsteps.org/logo.png",
                  width: "512",
                  height: "284",
                  caption: "StartSteps Digital Education",
                  encodingFormat: "image/png",
                },
              },
              {
                "@type": "WebSite",
                "@id": `${shareUrl}/#/website`,
                url: baseUrlWithLanguage,
                inLanguage: locale,
                name: "StartSteps Digital Education",
              },
              {
                "@type": "WebPage",
                "@id": `${shareUrl}/#/webpage`,
                breadcrumb: {
                  "@id": `${shareUrl}/#/breadcrumblist`,
                },
                inLanguage: locale,
                name: utils.cleanText(content.title.rendered, true, true),
                description: utils.cleanText(
                  content.excerpt.rendered,
                  true,
                  false
                ),
                isPartOf: {
                  "@id": `${shareUrl}/#/website`,
                },
              },
              {
                "@type": "BlogPosting",
                "@id": `${shareUrl}/#/blogposting`,
                mainEntityOfPage: {
                  "@id": `${shareUrl}/#/webpage`,
                },
                name: utils.cleanText(content.title.rendered, true, true),
                headline: utils.cleanText(content.title.rendered, true, true),
                articleSection: "Tech",
                abstract: utils.cleanText(
                  content.excerpt.rendered,
                  true,
                  false
                ),
                inLanguage: locale,
                dateModified: content.modified,
                datePublished: content.date,
                author: {
                  "@id": `${shareUrl}/#/organization`,
                },
                publisher: {
                  "@id": `${shareUrl}/#/organization`,
                },
                ...(content.acf.image && {
                  image: {
                    "@type": "ImageObject",
                    "@id": `${content.acf.image.url}/#/imageobject`,
                    url: content.acf.image.url,
                    width: content.acf.image.width,
                    height: content.acf.image.height,
                    caption: content.acf.image.alt,
                    encodingFormat: content.acf.image.mime_type,
                  },
                }),
              },
              {
                "@type": "BreadcrumbList",
                "@id": `${shareUrl}/#/breadcrumblist`,
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: baseUrlWithLanguage,
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Blog",
                    item: `${baseUrlWithLanguage}/blog`,
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: utils.cleanText(content.title.rendered, true, true),
                    item: `https://startsteps.org/${router.locale}${router.asPath}`,
                  },
                ],
              },
            ],
          })}
        />
      </Head>
      <div className="max-w-4xl mx-auto py-32 px-4">
        <img
          className="mb-8 mx-auto"
          src={content.acf.image.url}
          alt={content.acf.image.alt}
        />
        <h1 className="text-3xl lg:text-5xl font-bold">
          {content.title.rendered}
        </h1>
        <p className="text-gray-500 text-lg mt-6">
          {author} {author && <span className="mx-2">|</span>}
          {utils.formatDate(content.date)}
        </p>
        <div
          className="blog-content mt-12"
          dangerouslySetInnerHTML={{
            __html: utils.cleanText(content.content.rendered, true, false, [
              "img",
            ]),
          }}
        ></div>
      </div>
    </article>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const dePosts: any[] = (await api.getBlogPosts("de")) as any[];
  const enPosts: any[] = (await api.getBlogPosts("en")) as any[];
  const dePaths = dePosts
    .filter((post) => post.categories[0] === 2)
    .map((post: any) => {
      return {
        params: {
          slug: post.slug,
        },
        locale: "de",
      };
    });

  const enPaths = enPosts
    .filter((post) => post.categories[0] === 1)
    .map((post: any) => {
      return {
        params: {
          slug: post.slug,
        },
        locale: "en",
      };
    });

  return {
    paths: dePaths.concat(enPaths),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<{
  content: any;
  author: any;
}> = async (context) => {
  const locale = context.locale === "en" ? "en" : "de";
  const slug = context.params?.slug;

  if (typeof slug !== "string") {
    throw new Error(`Invalid slug ${slug}`);
  }

  const content: any = await api.getBlogPost(locale, slug);

  if (!content.title) {
    return { notFound: true };
  }

  return {
    props: {
      content: content,
      title: content.title.rendered,
      description: utils.cleanText(content.excerpt.rendered, true, true),
      locale: context.locale,
      author: content.acf.author ?? null,
      alternativeLanguagePageSlug:
        content.acf.alternative_language_page_slug ?? null,
    },
  };
};

export default Partner;
