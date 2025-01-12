import React, { FC, useState, useEffect } from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { Helmet } from "react-helmet";
import { helmetJsonLdProp } from "react-schemaorg";
// Helper
import api from 'api';
import utils from 'utils';

// Components
import Loading from 'components/Loading';

// Styles


const BlogDetail: FC<{ language: "en" | "de", match: any }> = ({ language, match }) => {
  const [content, setContent] = useState<{ [key: string]: any } | undefined>(undefined)
  const [error, setError] = useState("")
  const [shareUrl, setShareUrl] = useState("")
  const baseUrlWithLanguage = `https://startsteps.org/${language}`

  useEffect(() => {
    const getContent = async () => {
      (window as any).closeDownloadOverlay();
      window.scrollTo(0, 0);

      api.getBlogPost(language, match.params.slug)
        .then((content) => {
          setContent(content);

          window.scrollTo(0, 0);
          (window as any).onScroll(true);
        })
        .catch((error) => {
          setError(error);
        });
    }
    getContent()
    setShareUrl(window.location.href)
  }, [language, match])
  // componentDidUpdate(prevProps) {
  //   if (this.props.slug !== prevProps.slug || this.props.language !== prevProps.language || this.props.match.params.slug !== prevProps.match.params.slug) {
  //     this.setState({ content: null }, this.getContent);
  //   }
  // }
  // componentDidMount() {
  //   this.getContent();
  // }
  if (!content) {
    return (<Loading errorMessage={error} />);
  }
  // if (!content.title) {
  //   this.props.history.replace(`/${this.props.language}/blog`);
  //   return null;
  // }
  const shareButtons = (
    <div className="blog-detail__share">
      <TwitterShareButton url={shareUrl}>
        <TwitterIcon size={24} borderRadius={8} />
      </TwitterShareButton>
      <FacebookShareButton url={shareUrl}>
        <FacebookIcon size={24} borderRadius={8} />
      </FacebookShareButton>
      <LinkedinShareButton url={shareUrl}>
        <LinkedinIcon size={24} borderRadius={8} />
      </LinkedinShareButton>
    </div>
  );
  return (
    <article className="blog-detail">
      <Helmet script={[
        helmetJsonLdProp({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${shareUrl}/#/organization`,
              "name": "StartSteps Digital Education",
              "url": baseUrlWithLanguage,
              "sameAs": [
                "https://www.linkedin.com/school/startsteps/",
                "https://www.instagram.com/startsteps_germany/",
                "https://www.facebook.com/startsteps"
              ],
              "logo": {
                "@type": "ImageObject",
                "@id": "https://startsteps.org/logo.png/#/logo",
                "url": "https://startsteps.org/logo.png",
                "width": "512",
                "height": "284",
                "caption": "StartSteps Digital Education",
                "encodingFormat": "image/png"
              }
            },
            {
              "@type": "WebSite",
              "@id": `${shareUrl}/#/website`,
              url: baseUrlWithLanguage,
              inLanguage: language,
              name: "StartSteps Digital Education",
            },
            {
              "@type": "WebPage",
              "@id": `${shareUrl}/#/webpage`,
              "breadcrumb": {
                "@id": `${shareUrl}/#/breadcrumblist`,
              },
              inLanguage: language,
              name: utils.cleanText(content.title.rendered, true, true),
              description: utils.cleanText(content.excerpt.rendered, true, false, ['img']),
              isPartOf: {
                "@id": `${shareUrl}/#/website`
              }
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
              abstract: utils.cleanText(content.excerpt.rendered, true, false, ['img']),
              inLanguage: language,
              dateModified: content.modified,
              datePublished: content.date,
              author: {
                "@id": `${shareUrl}/#/organization`,
              },
              publisher: {
                "@id": `${shareUrl}/#/organization`
              },
              ...(content.acf.image &&
              {
                image: {
                  "@type": "ImageObject",
                  "@id": `${content.acf.image.url}/#/imageobject`,
                  "url": content.acf.image.url,
                  "width": content.acf.image.width,
                  "height": content.acf.image.height,
                  "caption": content.acf.image.alt,
                  "encodingFormat": content.acf.image.mime_type
                }
              })
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${shareUrl}/#/breadcrumblist`,
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  name: "Home",
                  "item": baseUrlWithLanguage,
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  name: "Blog",
                  "item": `${baseUrlWithLanguage}/blog`,
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": utils.cleanText(content.title.rendered, true, true),
                  "item": `https://startsteps.org/en/blog/${match.params.slug}`,
                }
              ]
            },
          ],
        })]
      }
      >
        <title>{content.title.rendered} &mdash; StartSteps: Digital Skills & the Jobs of the Future</title>
        <meta key="description" name="description" content={utils.cleanText(content.excerpt.rendered, true, true)} />
        <meta name="robots" content="index,follow" />
        <meta name="googlebot" content="index,follow" />
        <meta property="og:title" content={utils.cleanText(content.title.rendered, true, true)} />
        <meta property="og:description" content={utils.cleanText(content.excerpt.rendered, true, true)} />
        <meta property="og:type" content="article" />
        {content.acf.image &&
          <meta property="og:image" content={content.acf.image.url} />
        }
        {content.acf.image &&
          <meta property="og:image:type" content={content.acf.image.mime_type} />
        }
        {content.acf.image &&
          <meta property="og:image:width" content={content.acf.image.width} />
        }
        {content.acf.image &&
          <meta property="og:image:height" content={content.acf.image.height} />
        }
        <meta property="article:published_time" content={content.date} />
        <meta name="twitter:card" content="summary" />
      </Helmet>
      <div className="row">
        <div className="col-2 col-0-sm" />
        <div className="col-1 col-0-sm blog-detail__back-wrapper hide-on-mobile">
          {/* <Link
            to={{
              pathname: `/${language}/blog`,
            }}
            className="blog-detail__back"
          /> */}
        </div>
        <div className="col-6 col-12-sm">
          <h1
            className="blog-detail__title"
            dangerouslySetInnerHTML={
              { __html: utils.cleanText(content.title.rendered, true) }
            }
          />
          <div className="blog-detail__date">
            {utils.formatDate(content.date)}
            {shareButtons}
          </div>
        </div>
        <div className="col-3 col-0-sm" />
      </div>

      <div className="full-width-outer">
        <div className="full-width-inner">
          <div className="row">
            <div className="col-3 col-0-sm" />
            <div className="col-6 col-12-sm">
              <div className="blog-detail__content">
                <div
                  className="blog-detail__text"
                  dangerouslySetInnerHTML={
                    { __html: utils.cleanText(content.content.rendered, true, false, ['img']) }
                  }
                />
                {shareButtons}
              </div>
            </div>
            <div className="col-3 col-0-sm" />
          </div>
        </div>
      </div>
    </article >
  );
}

export default BlogDetail;
