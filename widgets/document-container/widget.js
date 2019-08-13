import React from 'react';
import Props from './props';
import Widget from 'goblin-laboratory/widgets/widget';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';
import getPath from './getPath';

// Container with a paper sheet look, with the top right corner folded.

export default class DocumentContainer extends Widget {
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

DocumentContainer.propTypes = makePropTypes(Props);
DocumentContainer.defaultProps = makeDefaultProps(Props);

/******************************************************************************/
