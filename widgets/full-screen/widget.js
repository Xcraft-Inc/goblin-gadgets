//T:2019-02-27
import React from 'react';
import Props from './props';
import Widget from 'goblin-laboratory/widgets/widget';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';
import * as styles from './styles';

/******************************************************************************/

export default class FullScreen extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.onBackgroundClick = this.onBackgroundClick.bind(this);
  }

  onBackgroundClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  /******************************************************************************/

  render() {
    return (
      <div
        className={this.styles.classNames.fullScreen}
        onMouseDown={this.onBackgroundClick}
        onTouchStart={this.onBackgroundClick}
      >
        {this.props.children}
      </div>
    );
  }
}

/******************************************************************************/

FullScreen.propTypes = makePropTypes(Props);
FullScreen.defaultProps = makeDefaultProps(Props);
