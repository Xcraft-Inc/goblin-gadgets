//T:2019-02-27
import React from 'react';
import Widget from 'laboratory/widget';
import ReactMarkdown from 'react-markdown';

/******************************************************************************/

export default class Markdown extends Widget {
  constructor() {
    super(...arguments);
  }

  render() {
    return (
      <ReactMarkdown
        className={this.styles.classNames.markdown}
        {...this.props}
      />
    );
  }
}

/******************************************************************************/
