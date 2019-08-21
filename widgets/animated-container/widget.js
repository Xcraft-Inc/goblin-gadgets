import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';

/******************************************************************************/

export default class AnimatedContainer extends Widget {
  constructor() {
    super(...arguments);
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
