import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Props from './props';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';
import * as styles from './styles';

/******************************************************************************/

export default class ColorerContainer extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  render() {
    return (
      <div className={this.styles.classNames.colorerContainer}>
        {this.props.children}
      </div>
    );
  }
}

/******************************************************************************/

ColorerContainer.propTypes = makePropTypes(Props);
ColorerContainer.defaultProps = makeDefaultProps(Props);
