//T:2019-02-27

import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

/******************************************************************************/

export default class CarouselButton extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  render() {
    return (
      <div
        className={this.styles.classNames.carouselButton}
        onClick={this.props.disabled ? null : this.props.onClick}
      >
        <FontAwesomeIcon
          icon={[
            'far',
            this.props.kind === 'left' ? 'chevron-left' : 'chevron-right',
          ]}
        />
      </div>
    );
  }
}

/******************************************************************************/
