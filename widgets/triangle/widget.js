import React from 'react';
import Props from './props';
import Widget from 'goblin-laboratory/widgets/widget';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';
import * as styles from './styles';

/******************************************************************************/

export default class Triangle extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  renderTriangle() {
    return <div className={this.styles.classNames.triangle} />;
  }

  render() {
    if (this.props.parentSimulatorWidth && this.props.parentSimulatorHeight) {
      // Simulation with parent.
      return (
        <div className={this.styles.classNames.parentSimulator}>
          {this.renderTriangle()}
        </div>
      );
    } else {
      // Standard default.
      return this.renderTriangle();
    }
  }
}

/******************************************************************************/

Triangle.propTypes = makePropTypes(Props);
Triangle.defaultProps = makeDefaultProps(Props);

/******************************************************************************/
