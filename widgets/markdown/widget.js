//T:2019-02-27
import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import * as styles from './styles';

/******************************************************************************/

export default class Markdown extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  render() {
    const {source, ...rest} = this.props;
    return (
      <ReactMarkdown
        className={this.styles.classNames.markdown}
        remarkPlugins={[remarkGfm]}
        {...rest}
      >
        {source}
      </ReactMarkdown>
    );
  }
}

/******************************************************************************/
