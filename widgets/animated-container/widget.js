import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';

/******************************************************************************/

export default class AnimatedContainer extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  render() {
    return (
      <div
        className={this.styles.classNames.stackNavigationContainer}
        onAnimationEnd={this.props.onAnimationEnd}
      >
        {this.props.children}
      </div>
    );
  }
}
