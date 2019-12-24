//T:2019-02-27

import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';

/******************************************************************************/

export default class CarouselBullet extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  render() {
    return (
      <div
        className={this.styles.classNames.bullet}
        onClick={this.props.onClick}
      />
    );
  }
}

/******************************************************************************/
