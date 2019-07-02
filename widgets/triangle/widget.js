import React from 'react';
import Props from './props';
import Widget from 'laboratory/widget';
import * as Bool from 'gadgets/helpers/bool-helpers';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';

/******************************************************************************/

export default class Triangle extends Widget {
  constructor() {
    super(...arguments);
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
