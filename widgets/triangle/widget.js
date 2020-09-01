import React from 'react';
import props from './props';
import {registerWidget} from 'goblin-gadgets/widgets/widget-doc/widget-list';
import Widget from 'goblin-laboratory/widgets/widget';
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

registerWidget(Triangle, props, null, false);
