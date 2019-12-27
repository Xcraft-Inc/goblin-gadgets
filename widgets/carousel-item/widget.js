//T:2019-02-27

import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';

/******************************************************************************/

export default class CarouselItem extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  render() {
    return (
      <div className={this.styles.classNames.carouselItem}>
        {this.props.children}
      </div>
    );
  }
}

/******************************************************************************/
