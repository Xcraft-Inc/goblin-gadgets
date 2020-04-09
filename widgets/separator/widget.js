import React from 'react';
import Props from './props';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';

/******************************************************************************/

export default class Separator extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  render() {
    return (
      <div
        className={this.styles.classNames.box}
        disabled={this.props.disabled}
      />
    );
  }
}

/******************************************************************************/

Separator.propTypes = makePropTypes(Props);
Separator.defaultProps = makeDefaultProps(Props);
