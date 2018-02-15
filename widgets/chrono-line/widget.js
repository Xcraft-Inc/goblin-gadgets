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
      hover: 'none',
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

    if (!window.document.ticketsPolypheme) {
      window.document.ticketsPolypheme = [];
    }
    window.document.ticketsPolypheme.push (this);
  }

  componentWillUnmount () {
    const index = window.document.ticketsPolypheme.indexOf (this);
    if (index !== -1) {
      window.document.ticketsPolypheme.splice (index, 1);
    }
  }

  updateHover (state) {
    if (this.props.isDragged) {
      for (const ticket of window.document.ticketsPolypheme) {
        ticket.hover = 'none';
      }
    } else if (this.props.link) {
      for (const ticket of window.document.ticketsPolypheme) {
        if (ticket.props.link === this.props.link && state) {
          ticket.hover = ticket === this ? 'me' : 'other';
        } else {
          ticket.hover = 'none';
        }
      }
    }
  }

  onMouseOver () {
    this.updateHover (true);
  }

  onMouseOut () {
    this.updateHover (false);
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
        cursor={this.props.cursor}
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

    const boxClass = this.styles.classNames.box;
    const styleName = this.props.isDragged
      ? 'lineDragged'
      : this.hover === 'me' ? 'lineHover' : 'line';
    const lineClass = this.styles.classNames[styleName];
    const lineFrontClass = this.hover !== 'none' &&
      !this.props.isDragged &&
      !this.props.hasHeLeft
      ? this.styles.classNames.lineFrontHover
      : this.styles.classNames.lineFront;
    const lineLabelClass = this.styles.classNames.lineLabel;
    const lineEventClass = this.styles.classNames.lineEvent;

    return (
      <div className={boxClass}>
        <div className={lineClass}>
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
              cursor={this.props.cursor}
            />
          </div>
        </div>
        <div className={lineFrontClass} />
      </div>
    );
  }
}

/******************************************************************************/
export default ChronoLine;
