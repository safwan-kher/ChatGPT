import React from 'react';

// Helper
import api from 'api';
import utils from 'utils';

// Components
import Loading from 'components/Loading';

// Styles


class BlogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
      posts: null,
      errorMessage: '',
    };
  }
  getContent() {
    window.closeDownloadOverlay();
    window.scrollTo(0, 0);

    api.getContent('blog', this.props.language)
      .then(({ content, title }) => {
        this.setState({
          content: {
            ...content,
            title,
          },
        });

        window.scrollTo(0, 0);
        window.onScroll(true);

        this.getPosts();
      })
      .catch((error) => {
        this.setState({ errorMessage: error });
      });
  }
  getPosts() {
    api.getBlogPosts(this.props.language)
      .then((posts) => {
        this.setState({ posts });
      })
      .catch((error) => {
        this.setState({ errorMessage: error });
      });
  }
  componentDidUpdate(prevProps) {
    if (this.props.slug !== prevProps.slug || this.props.language !== prevProps.language) {
      this.setState({
        content: null,
        posts: null,
      }, this.getContent);
    }
  }
  componentDidMount() {
    this.getContent();
  }
  render() {
    if (!this.state.content && !this.state.posts) {
      return (<Loading errorMessage={this.state.errorMessage} />);
    }

    const posts = [];
    if (this.state.posts && this.state.posts.length) {
      this.state.posts.forEach((post, index) => {
        posts.push(
          null
          // <Link
          //   to={{
          //     pathname: `/${this.props.language}/blog/${post.slug}`,
          //   }}
          //   className="blog-list__item"
          //   key={index}
          // >
          //   <div className="blog-list__item__title">{post.title.rendered}</div>
          //   <div className="blog-list__item__date">{utils.formatDate(post.date)}</div>
          //   <div
          //     className="blog-list__item__text"
          //     dangerouslySetInnerHTML={
          //       { __html: utils.cleanText(post.excerpt.rendered, true, true) }
          //     }
          //   ></div>
          // </Link>
        );
      });
    } else {
      posts.push(
        <div
          className="blog-list__item"
          key={1}
        >
          <div className="blog-list__item__title">{this.state.content.blog_no_posts_message}</div>
        </div>
      );
    }

    return (
      <div className="blog-list">
        <div className="full-width-outer">
          <div className="full-width-inner">
            <div className="row">
              <div className="col-2 col-0-sm" />
              <div className="col-8 col-12-sm">
                <h1
                  className="blog-list__title"
                  dangerouslySetInnerHTML={
                    { __html: utils.cleanText(this.state.content.title, true) }
                  }
                />
              </div>
              <div className="col-2 col-0-sm" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-2 col-0-sm" />
          <div className="col-8 col-12-sm">
            <div className="blog-list__items">
              {posts}
            </div>
          </div>
          <div className="col-2 col-0-sm" />
        </div>
      </div>
    );
  }
}

export default BlogList;
