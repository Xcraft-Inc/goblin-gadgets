import React from 'react';
import Props from './props';
import Widget from 'goblin-laboratory/widgets/widget';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';

// Container with a paper sheet look, with the top right corner folded.

export default class DocumentContainerOld extends Widget {
  render() {
    return (
      <div className={this.styles.classNames.documentContainer}>
        <div
          className={`border-hover ${this.styles.classNames.cornerBorder}`}
        />
        <div className={`corner-hover ${this.styles.classNames.cornerPart}`} />
        <div className={`main-hover ${this.styles.classNames.mainPart}`} />
        <div className={`right-hover ${this.styles.classNames.rightPart}`} />
        <div className={`top-hover ${this.styles.classNames.topPart}`} />
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

DocumentContainerOld.propTypes = makePropTypes(Props);
DocumentContainerOld.defaultProps = makeDefaultProps(Props);

/******************************************************************************/
