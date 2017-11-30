import React from 'react';
import Widget from 'laboratory/widget';
import * as Bool from 'gadgets/boolean-helpers';
import ChronoLabel from 'gadgets/chrono-label/widget';
import ChronoEvent from 'gadgets/chrono-event/widget';

/******************************************************************************/

class ChronoLine extends Widget {
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

  componentDidMount () {
    super.componentDidMount ();

    if (!window.document.chronoLines) {
      window.document.chronoLines = [];
    }
    window.document.chronoLines.push (this);
  }

  componentWillUnmount () {
    const index = window.document.chronoLines.indexOf (this);
    if (index !== -1) {
      window.document.chronoLines.splice (index, 1);
    }
  }

  onMouseOver () {
    const x = this.props.mouseOver;
    if (x) {
      x (this.props.event);
    }
  }

  onMouseOut () {
    const x = this.props.mouseOut;
    if (x) {
      x (this.props.event);
    }
  }

  /******************************************************************************/

  renderLabel (note, isDragged, hasHeLeft, index) {
    return (
      <ChronoLabel
        key={index}
        isDragged={isDragged}
        hasHeLeft={hasHeLeft}
        note={note}
        lineWidth={this.props.lineWidth}
        glyphWidth={this.props.glyphWidth}
        mouseOver={this.onMouseOver}
        mouseOut={this.onMouseOut}
      />
    );
  }

  renderLabels (event, isDragged, hasHeLeft) {
    const result = [];
    let index = 0;
    if (event.note) {
      // only one note ?
      result.push (
        this.renderLabel (event.note, isDragged, hasHeLeft, index++)
      );
    } else if (event.notes) {
      // collection of notes ?
      for (var note of event.notes) {
        result.push (this.renderLabel (note, isDragged, hasHeLeft, index++));
      }
    }
    const len = this.props.notesCount - index;
    for (let i = 0; i < len; i++) {
      result.push (this.renderLabel (null, isDragged, hasHeLeft, index++));
    }
    return result;
  }

  render () {
    if (!this.props.id) {
      return null;
    }

    const hover = !this.props.isDragged && this.hover;
    const cursor = this.props.isDragged ? 'move' : 'default';

    let styleName = hover ? 'lineHover' : 'line';
    if (this.props.isDragged) {
      styleName = 'lineDragged';
    }
    const lineClass = this.styles.classNames[styleName];
    const lineLabelClass = this.styles.classNames.lineLabel;
    const lineEventClass = this.styles.classNames.lineEvent;

    // FIXME: it's a bad idea to mutate the styles in the render, see styles.js
    const lineStyle = Object.assign ({}, this.styles.props[styleName]);
    lineStyle.cursor = cursor;

    return (
      <div className={lineClass} style={lineStyle}>
        <div className={lineLabelClass}>
          {this.renderLabels (
            this.props.event,
            this.props.isDragged,
            this.props.hasHeLeft
          )}
        </div>
        <div className={lineEventClass}>
          <ChronoEvent
            event={this.props.event}
            isDragged={this.props.isDragged}
            hasHeLeft={this.props.hasHeLeft}
            minHour={this.props.minHour}
            maxHour={this.props.maxHour}
            mouseOver={this.onMouseOver}
            mouseOut={this.onMouseOut}
          />
        </div>
      </div>
    );
  }
}

/******************************************************************************/
export default ChronoLine;
