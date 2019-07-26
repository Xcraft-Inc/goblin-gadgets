import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';

// Container with a paper sheet look, with the top right corner folded.

export default class DocumentContainer extends Widget {
  render() {
    return (
      <div className={this.styles.classNames.documentContainer}>
        <div className={this.styles.classNames.mainPart} />
        <div className={this.styles.classNames.rightPart} />
        <div className={this.styles.classNames.cornerPart} />
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
