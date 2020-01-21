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
    let className = this.styles.classNames.animatedContainer;
    if (!this.props.fitContent) {
      className += ' ' + this.styles.classNames.fillParent;
    }
    return (
      <div className={className} onAnimationEnd={this.props.onAnimationEnd}>
        {this.props.children}
      </div>
    );
  }
}
