import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';

/******************************************************************************/

export default class Smiley extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  render() {
    return (
      <div className={this.styles.classNames.smiley}>
        <div className={this.styles.classNames.reflexion1} />
        <div className={this.styles.classNames.reflexion2} />
        <div className={this.styles.classNames.leftEye} />
        <div className={this.styles.classNames.rightEye} />
        <div className={this.styles.classNames.smile}>
          <div className={this.styles.classNames.leftCorner} />
          <div className={this.styles.classNames.rightCorner} />
        </div>
      </div>
    );
  }
}

/******************************************************************************/
