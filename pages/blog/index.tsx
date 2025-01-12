import React, { FC } from "react";
import Link from "next/link";
import { InferGetStaticPropsType, GetStaticProps } from "next";

import api from "../../src/api";
import { IGetLayout } from "../../src/components/DefaultLayout";
import { getBlogIndexLayout } from "../../src/components/BlogIndexLayout";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

const Partner: FC<
  InferGetStaticPropsType<typeof getStaticProps> & { getLayout: IGetLayout }
> = ({ content, title, posts }) => {
  const router = useRouter();
  const locale = router.locale === "en" ? "en" : "de";

  return (
    <div className="bg-gray-100">
      <NextSeo canonical={`https://startsteps.org/${locale}/blog`} />
      <div className="px-4 sm:px-16 xl:px-24 pt-52 sm:pt-64 pb-32">
        <h1 className="text-3xl sm:text-5xl font-semibold">{title}</h1>
        <ul className="list-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-16 sm:mt-24">
          {posts.map((post, index) => (
            <li
              className="bg-white hover:-translate-y-3 transition ease-in-out duration-300 hover:shadow-xl self-start"
              key={index}
            >
              <Link href={`/blog/${post.slug}`} className="block">
                {post.acf.image && (
                  <img
                    className="bg-white aspect-[2/1] object-cover w-full"
                    src={post.acf.image.sizes.medium}
                    alt={post.acf.image.alt}
                  />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-medium leading-snug">
                    {post.title.rendered}
                  </h2>
                  {post.acf.author && (
                    <p className="mt-4 text-gray-500">{post.acf.author}</p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Partner.defaultProps = { getLayout: getBlogIndexLayout };

export const getStaticProps: GetStaticProps<{
  content: any;
  title: string;
  posts: any[];
}> = async (context) => {
  const locale = context.locale === "en" ? "en" : "de";
  const { content, title, description } = (await api.getContent(
    "blog",
    locale
  )) as any;
  const posts = (await api.getBlogPosts(locale)) as any[];
  return {
    props: {
      content: content,
      title: title,
      posts: posts,
      locale: context.locale,
      description: description,
    },
  };
};

export default Partner;
