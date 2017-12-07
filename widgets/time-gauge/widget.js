import React from 'react';
import Widget from 'laboratory/widget';
import {time as TimeConverters} from 'xcraft-core-converters';
import * as Bool from 'gadgets/boolean-helpers';

import Gauge from 'gadgets/gauge/widget';

/******************************************************************************/

class TimeGauge extends Widget {
  constructor () {
    super (...arguments);
  }

  componentDidMount () {
    super.componentDidMount ();
    this.timer = setInterval (() => this.forceUpdate (), 1000 * 60);
  }

  componentWillUnmount () {
    clearInterval (this.timer);
  }

  render () {
    if (this.props.time) {
      const nowMinutes = TimeConverters.getTotalMinutes (
        TimeConverters.getNowCanonical ()
      );
      const minutes = TimeConverters.getTotalMinutes (this.props.time);

      let range = 60;
      if (this.props.range) {
        if (typeof this.props.range === 'string') {
          range = parseInt (this.props.range);
        } else {
          range = this.props.range;
        }
      }

      const delta = minutes - nowMinutes;
      const value = 100 - delta * 100 / range;
      const flash = value > 100;
      const limit = Math.min (Math.max (value, 0), 100);

      return <Gauge value={limit} flash={Bool.toString (flash)} />;
    } else {
      return null;
    }
  }
}

/******************************************************************************/
export default TimeGauge;
