import React from 'react';
import withC from 'goblin-laboratory/widgets/connect-helpers/with-c';
import Widget from 'goblin-laboratory/widgets/widget';
import props from './props';
import scenarios from './scenarios';
import {registerWidget} from 'goblin-gadgets/widgets/widget-doc/widget-list';
import * as styles from './styles';

/******************************************************************************/

class Gauge extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  render() {
    return (
      <div className={this.styles.classNames.gauge}>
        <div className={this.styles.classNames.content} />
        <div className={this.styles.classNames.gloss} />
      </div>
    );
  }
}

/******************************************************************************/

const GaugeConnected = withC(Gauge);
GaugeConnected.displayName = 'Gauge';

export default GaugeConnected;

/******************************************************************************/

registerWidget(Gauge, props, scenarios);
