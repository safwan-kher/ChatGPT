import React from 'react';

// Helper
import api from 'api';

// Components
import Loading from 'components/Loading';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentLoadedCallback: null,
      content: null,
      errorMessage: '',
      slugOverride: null,
    };
  }
  getContent() {
    window.closeDownloadOverlay();
    window.scrollTo(0, 0);
    const slug = this.state.slugOverride ? this.props.match.params[this.state.slugOverride] : this.props.slug;
    api.getContent(slug, this.props.language)
      .then(({ content }) => {
        this.setState({ content }, () => {
          if (this.state.contentLoadedCallback) {
            this.state.contentLoadedCallback(content);
          }
        });

        window.scrollTo(0, 0);
        window.onScroll(true);
      })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });
  }
  componentDidUpdate(prevProps) {
    let updateContent = this.props.slug !== prevProps.slug || this.props.language !== prevProps.language;
    if (this.state.slugOverride) {
      const extraCheck = prevProps.match.params[this.state.slugOverride] !== this.props.match.params[this.state.slugOverride];
      updateContent = updateContent || extraCheck;
    }
    if (updateContent) {
      this.setState({ content: null }, this.getContent);
    }
  }
  componentDidMount(slugOverride, contentLoadedCallback = null) {
    this.setState({
      slugOverride,
      contentLoadedCallback,
    }, this.getContent);
  }
  render() {
    if (!this.state.content) {
      return (<Loading errorMessage={this.state.errorMessage} />);
    }
    return null;
  }
}
