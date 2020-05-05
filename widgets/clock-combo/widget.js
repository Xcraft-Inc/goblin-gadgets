import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import T from 't';

import Label from 'goblin-gadgets/widgets/label/widget';
import AnalogClock from 'goblin-gadgets/widgets/analog-clock/widget';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {time as TimeConverters} from 'xcraft-core-converters';
import * as styles from './styles';

/******************************************************************************/

function changeTime(time, type, inc) {
  if (type === 'hours') {
    return TimeConverters.addHours(time, inc);
  } else {
    return TimeConverters.addMinutes(time, inc);
  }
}

function getDelay(type, count) {
  return type === 'hours' ? 500 : Math.max(500 - count * 100, 50);
}

// TODO: Improve this hack!
function draggingUsed() {
  const count = window.document.clockComboDraggingCounter || 0;
  window.document.clockComboDraggingCounter = count + 1;
}

// TODO: Improve this hack!
function wheelUsed() {
  const count = window.document.clockComboWheelCounter || 0;
  window.document.clockComboWheelCounter = count + 1;
}

// TODO: Improve this hack!
function rotateUsed() {
  const count = window.document.clockComboRotateCounter || 0;
  window.document.clockComboRotateCounter = count + 1;
}

/******************************************************************************/

export default class ClockCombo extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      localTime: null,
      draggedTime: null,
      cursorY: null,
      whellInUse: false,
    };

    this.handleButtonDown = this.handleButtonDown.bind(this);
    this.handleLocal = this.handleLocal.bind(this);
    this.handleButtonUp = this.handleButtonUp.bind(this);
    this.handleCursorDown = this.handleCursorDown.bind(this);
    this.handleCursorMove = this.handleCursorMove.bind(this);
    this.handleCursorUp = this.handleCursorUp.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.handleWheelTimeout = this.handleWheelTimeout.bind(this);

    this.handleClockDragStarted = this.handleClockDragStarted.bind(this);
    this.handleClockDragMoved = this.handleClockDragMoved.bind(this);
    this.handleClockDragEnded = this.handleClockDragEnded.bind(this);
    this.handleClockDragged = this.handleClockDragged.bind(this);
  }

  //#region get/set
  get localTime() {
    return this.state.localTime;
  }

  set localTime(value) {
    this.setState({
      localTime: value,
    });
  }

  get draggedTime() {
    return this.state.draggedTime;
  }

  set draggedTime(value) {
    this.setState({
      draggedTime: value,
    });
  }

  get cursorY() {
    return this.state.cursorY;
  }

  set cursorY(value) {
    this.setState({
      cursorY: value,
    });
  }

  get whellInUse() {
    return this.state.whellInUse;
  }

  set whellInUse(value) {
    this.setState({
      whellInUse: value,
    });
  }
  //#endregion

  get time() {
    return this.localTime || this.props.time;
  }

  handleButtonDown(type, inc) {
    this.localTime = changeTime(this.props.time, type, inc);
    this.timeoutCounter = 0;
    this.timer = setTimeout(() => this.handleLocal(type, inc), 300);
  }

  handleLocal(type, inc) {
    this.localTime = changeTime(this.localTime, type, inc);
    const delay = getDelay(type, this.timeoutCounter++);
    this.timer = setTimeout(() => this.handleLocal(type, inc), delay);
  }

  handleButtonUp() {
    clearTimeout(this.timer);
    this.props.onChange(this.localTime);
    this.localTime = null;
  }

  handleCursorDown(e, type) {
    this.cursorType = type;
    this.cursorTime = this.time;
    this.cursorY = 0;
    this.cursorOriginY = e.clientY;
  }

  handleCursorMove(e) {
    if (this.cursorY !== null) {
      this.cursorY = e.clientY - this.cursorOriginY;
      const inc = this.cursorY / (this.cursorType === 'hours' ? 10 : 4);
      this.localTime = changeTime(this.cursorTime, this.cursorType, -inc);
    }
  }

  handleCursorUp() {
    if (this.cursorY !== null) {
      this.cursorType = null;
      this.cursorY = null;
      this.props.onChange(this.localTime);
      this.localTime = null;
      draggingUsed();
    }
    if (this.whellInUse) {
      this.whellInUse = false;
      wheelUsed();
    }
  }

  handleWheel(e) {
    const inc = e.deltaY < 0 ? 1 : -1;
    this.whellInUse = true;
    this.localTime = changeTime(this.time, 'minutes', inc);
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => this.handleWheelTimeout(), 1000);
  }

  handleWheelTimeout() {
    this.props.onChange(this.localTime);
    this.localTime = null;
    this.whellInUse = false;
    wheelUsed();
  }

  handleClockDragStarted(time) {
    this.draggedTime = time;
  }

  handleClockDragMoved(time) {
    this.draggedTime = time;
  }

  handleClockDragEnded() {
    this.draggedTime = null;
  }

  handleClockDragged(time) {
    this.props.onChange(time);
    rotateUsed();
  }

  /******************************************************************************/

  renderGlyph(glyph) {
    if (this.cursorType) {
      return null;
    }

    const parts = glyph.split('/');
    let prefix = '';
    if (parts.length === 2) {
      // prefix:
      // 'solid'   -> 's' -> fas (standard)
      // 'regular' -> 'r' -> far (outline)
      // 'light'   -> 'l' -> fal
      // 'brands'  -> 'b' -> fab
      if (
        parts[0] !== 'solid' &&
        parts[0] !== 'regular' &&
        parts[0] !== 'light' &&
        parts[0] !== 'brands'
      ) {
        console.error(`Glyph '${parts[1]}' has unknown prefix '${parts[0]}'`);
      }
      prefix = parts[0][0]; // first letter
      glyph = parts[1];
    } else {
      console.warn(`Glyph '${glyph}' without prefix`);
    }

    return <FontAwesomeIcon icon={[`fa${prefix}`, glyph]} />;
  }

  renderButton(glyph, type, inc) {
    return (
      <div
        className={this.styles.classNames.button}
        onMouseDown={() => this.handleButtonDown(type, inc)}
        onMouseUp={() => this.handleButtonUp()}
      >
        {this.renderGlyph(glyph)}
      </div>
    );
  }

  renderCursor(time, type) {
    if (type === 'hours') {
      time = TimeConverters.getHours(time);
    } else {
      time = TimeConverters.getMinutes(time);
    }
    time = time + '';
    if (time.length === 1) {
      time = '0' + time; // force 2 digits
    }

    if (type === this.cursorType) {
      // Cursor is moving.
      const y = 500 + 24 - this.cursorY;
      const style = {
        top: `calc(50% - ${y}px)`,
      };

      return (
        <div
          className={this.styles.classNames.cursorDragged}
          style={process ? style : null}
          onMouseMove={this.handleCursorMove}
          onMouseUp={this.handleCursorUp}
          onMouseLeave={this.handleCursorUp}
        >
          <div className={this.styles.classNames.cursorDraggedInside}>
            {time}
          </div>
        </div>
      );
    } else {
      // Cursor is fix.
      return (
        <div
          className={this.styles.classNames.cursor}
          onMouseDown={(e) => this.handleCursorDown(e, type)}
        >
          {time}
        </div>
      );
    }
  }

  renderGuide(type) {
    return (
      <div
        className={
          type === this.cursorType
            ? this.styles.classNames.guideShowed
            : this.styles.classNames.guideHidden
        }
      />
    );
  }

  renderPart(time, type) {
    return (
      <div
        className={
          this.whellInUse || !!this.draggedTime
            ? this.styles.classNames.partHidden
            : this.styles.classNames.part
        }
      >
        {this.renderGuide(type)}
        {this.renderButton('solid/plus', type, 1)}
        <div className={this.styles.classNames.vsep} />
        {this.renderButton('solid/minus', type, -1)}
        {this.renderCursor(time, type)}
      </div>
    );
  }

  renderHour() {
    return this.renderPart(this.time, 'hours');
  }

  renderMinute() {
    return this.renderPart(this.time, 'minutes');
  }

  renderClock() {
    const scale =
      !!this.cursorType || this.whellInUse || !!this.draggedTime ? 1.8 : 1;

    const tx = this.cursorType === 'minutes' ? '8px' : '0px';

    const style = {
      transform: `scale(${scale}) translate(${tx})`,
    };

    return (
      <div className={this.styles.classNames.clock} style={style}>
        <AnalogClock
          size="130px"
          look="classic"
          transition="none"
          fixedTime={this.time}
          digitalTime={scale > 1}
          draggingEnabled={!this.whellInUse}
          onDragStarted={this.handleClockDragStarted}
          onDragMoved={this.handleClockDragMoved}
          onDragEnded={this.handleClockDragEnded}
          onTimeChanged={this.handleClockDragged}
        />
      </div>
    );
  }

  renderTips() {
    if (!this.props.showTips) {
      return null;
    }

    return (
      <div className={this.styles.classNames.tips}>
        <Label
          text={T(
            "ASTUCE: Tirez vers le haut ou vers le bas le chiffre des heures ou des minutes. Ou utilisez la molette de la souris. Ou encore tournez directement l'aiguille des minutes."
          )}
          fontSize="75%"
          disabled={true}
        />
      </div>
    );
  }

  render() {
    return (
      <div
        className={this.styles.classNames.clockCombo}
        onWheel={(e) => this.handleWheel(e)}
      >
        <div className={this.styles.classNames.content}>
          {this.renderHour()}
          {this.renderMinute()}
          {this.renderClock()}
        </div>
        {this.renderTips()}
      </div>
    );
  }
}

/******************************************************************************/
