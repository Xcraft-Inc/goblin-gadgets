import React from 'react';
import Props from './props';
import Widget from 'goblin-laboratory/widgets/widget';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';

// Container with a paper sheet look, with the top right corner folded.

export default class DocumentContainer extends Widget {
  render() {
    return (
      <div className={this.styles.classNames.documentContainer}>
        <div className={`parts-hover ${this.styles.classNames.mainPart}`} />
        <div className={`parts-hover ${this.styles.classNames.rightPart}`} />
        <div className={`corner-hover ${this.styles.classNames.cornerPart}`} />
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
