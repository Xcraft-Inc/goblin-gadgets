import React from 'react';
import props from './props';
import scenarios from './scenarios';
import {registerWidget} from 'goblin-gadgets/widgets/widget-doc/widget-list';
import Widget from 'goblin-laboratory/widgets/widget';
import getPath from './getPath';
import * as styles from './styles';

// Container with a paper sheet look, with the top right corner folded.

export default class DocumentContainer extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  render() {
    if (!this.props.width || !this.props.height) {
      console.warn('DocumentContainer: width and height are required.');
      return null;
    }

    const path = getPath(
      this.props.width,
      this.props.height,
      this.props.cornerSize || '16px',
      this.props.borderSize || '2px'
    );

    return (
      <div className={this.styles.classNames.documentContainer}>
        <svg className={`color-hover ${this.styles.classNames.pathColor}`}>
          <path
            stroke={this.props.borderColor || 'black'}
            strokeWidth={this.props.borderSize || '2px'}
            strokeLinejoin="round"
            d={path}
          />
        </svg>
        <div
          className={this.styles.classNames.foreground}
          onClick={this.props.onClick}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

/******************************************************************************/

registerWidget(DocumentContainer, props, scenarios);
