import React from 'react';
import Widget from 'laboratory/widget';
import {time as TimeConverters} from 'xcraft-core-converters';
import * as Bool from 'gadgets/boolean-helpers';

import ChronoBar from 'gadgets/chrono-bar/widget';

/******************************************************************************/

class ChronoEvent extends Widget {
  constructor () {
    super (...arguments);

    this.state = {
      hover: false,
    };

    this.onMouseOver = this.onMouseOver.bind (this);
    this.onMouseOut = this.onMouseOut.bind (this);
  }

  get hover () {
    return this.state.hover;
  }

  set hover (value) {
    this.setState ({
      hover: value,
    });
  }

  onMouseOver () {
    this.hover = true;
    const x = this.props.mouseOver;
    if (x) {
      x (this.props.event);
    }
  }

  onMouseOut () {
    this.hover = false;
    const x = this.props.mouseOut;
    if (x) {
      x (this.props.event);
    }
  }

  /******************************************************************************/

  getPeriod (startTime, endTime) {
    const s = TimeConverters.getDisplayed (startTime);
    const e = TimeConverters.getDisplayed (endTime);
    if (s === e) {
      return s;
    } else {
      return `${s} — ${e}`;
    }
  }

  getLeftTooltip (event, tricolor, isTextToLeft) {
    if (tricolor) {
      return this.getPeriod (event.startFromTime, event.endFromTime);
    } else {
      if (event.fromTime === event.toTime && !isTextToLeft) {
        return null;
      } else {
        return this.getPeriod (event.fromTime, event.fromTime);
      }
    }
  }

  getRightTooltip (event, tricolor, isTextToLeft) {
    if (tricolor) {
      return this.getPeriod (event.startToTime, event.endToTime);
    } else {
      if (event.fromTime === event.toTime && isTextToLeft) {
        return null;
      } else {
        return this.getPeriod (event.toTime, event.toTime);
      }
    }
  }

  /******************************************************************************/

  renderVerticalLine (x) {
    const style = {
      position: 'absolute',
      top: '0px',
      height: '100%',
      left: x,
      width: '1px',
      backgroundColor: this.context.theme.palette.chronoLineSeparator,
    };
    return <div style={style} key={'vl' + x} />;
  }

  renderGrid (isDragged) {
    if (isDragged) {
      return null;
    } else {
      const result = [];
      const lenHour = this.props.maxHour - this.props.minHour;
      for (var h = this.props.minHour; h < this.props.maxHour; h++) {
        const x = (h - this.props.minHour + 1) * 100 / lenHour + '%';
        result.push (this.renderVerticalLine (x));
      }
      return result;
    }
  }

  renderBar (event, isDragged) {
    const minMinute = this.props.minHour * 60;
    const lenMinute = (this.props.maxHour - this.props.minHour) * 60;

    var startFromPos, endFromPos, startToPos, endToPos, tricolor;
    if (event.startFromTime) {
      startFromPos = TimeConverters.getTotalMinutes (event.startFromTime);
      endFromPos = TimeConverters.getTotalMinutes (event.endFromTime);
      startToPos = TimeConverters.getTotalMinutes (event.startToTime);
      endToPos = TimeConverters.getTotalMinutes (event.endToTime);
      tricolor = true;
    } else if (event.fromTime) {
      startFromPos = TimeConverters.getTotalMinutes (event.fromTime);
      endFromPos = TimeConverters.getTotalMinutes (event.fromTime);
      startToPos = TimeConverters.getTotalMinutes (event.toTime);
      endToPos = TimeConverters.getTotalMinutes (event.toTime);
      tricolor = false;
    } else {
      return null;
    }
    const middle = (startFromPos + endFromPos + startToPos + endToPos) / 4;
    const isTextToLeft = middle > minMinute + lenMinute / 2;

    // const left   = (fromPos * 100 / (24 * 60)) + '%';
    // const width  = (Math.max (toPos - fromPos, 2) * 100 / (24 * 60)) + '%';
    const startFrom = (startFromPos - minMinute) * 100 / lenMinute + '%';
    const endFrom = (endFromPos - minMinute) * 100 / lenMinute + '%';
    const startTo = (startToPos - minMinute) * 100 / lenMinute + '%';
    const endTo = (endToPos - minMinute) * 100 / lenMinute + '%';

    return (
      <ChronoBar
        startFrom={startFrom}
        endFrom={endFrom}
        startTo={startTo}
        endTo={endTo}
        color={event.color}
        tricolor={Bool.toString (tricolor)}
        leftTooltip={this.getLeftTooltip (event, tricolor, isTextToLeft)}
        rightTooltip={this.getRightTooltip (event, tricolor, isTextToLeft)}
        isDragged={isDragged}
        hover={Bool.toString (this.hover)}
      />
    );
  }

  renderFull (isDragged) {
    const lineClass = this.styles.classNames.line;
    const frontClass = this.styles.classNames.front;

    return (
      <div className={lineClass}>
        {this.renderGrid (isDragged)}
        {this.renderBar (this.props.event, isDragged)}
        <div
          className={frontClass}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        />
      </div>
    );
  }

  renderEmpty () {
    const lineClass = this.styles.classNames.empty;
    return <div className={lineClass} />;
  }

  render () {
    if (this.props.hasHeLeft && !this.props.isDragged) {
      return this.renderEmpty ();
    } else {
      return this.renderFull (this.props.isDragged);
    }
  }
}

/******************************************************************************/
export default ChronoEvent;
