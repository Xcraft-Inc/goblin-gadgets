import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import T from 't';

import AnalogClock from 'goblin-gadgets/widgets/analog-clock/widget';
import Tips from 'goblin-gadgets/widgets/tips/widget';
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

/******************************************************************************/

class ClockCombo extends Widget {
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
    e.target.setPointerCapture(e.pointerId);

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

  handleCursorUp(e) {
    if (this.cursorY !== null) {
      this.cursorType = null;
      this.cursorY = null;
      this.props.onChange(this.localTime);
      this.localTime = null;

      e.target.releasePointerCapture(e.pointerId);
    }
    if (this.whellInUse) {
      this.whellInUse = false;
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
      const y = 24 - this.cursorY;
      const style = {
        top: `calc(50% - ${y}px)`,
      };

      return (
        <div
          className={this.styles.classNames.cursorDragged}
          style={process ? style : null}
          onPointerMove={this.handleCursorMove}
          onPointerUp={this.handleCursorUp}
        >
          {time}
        </div>
      );
    } else {
      // Cursor is fix.
      return (
        <div
          className={this.styles.classNames.cursor}
          onPointerDown={(e) => this.handleCursorDown(e, type)}
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
    // prettier-ignore
    const tips = [
      T('Maintenez le bouton de la souris appuyé sur les boutons + ou \u2212.'),
      T('Tirez vers le haut ou vers le bas le chiffre des heures ou des minutes.'),
      T("Tournez directement l'aiguille des minutes."),
      T('Utilisez la molette de la souris.'),
    ];

    const style = {
      height: this.props.showTips ? '48px' : '0px',
    };

    return (
      <div
        className={
          this.whellInUse || !!this.draggedTime
            ? this.styles.classNames.tipsHidden
            : this.styles.classNames.tips
        }
        style={style}
      >
        <Tips
          grow={1}
          height={this.props.showTips ? '32px' : '0px'}
          layout="horizontal"
          id="goblin-gadgets/clock-combo"
          tips={tips}
        />
      </div>
    );
  }

  render() {
    return (
      <div
        className={
          this.props.showTips
            ? this.styles.classNames.clockComboTips
            : this.styles.classNames.clockCombo
        }
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

export default Widget.connect((state) => {
  const userSession = Widget.getUserSession(state);
  const data = userSession.get('tips.goblin-gadgets/clock-combo');
  const tipsRank = data ? data.get('rank') : 0; // show first tip if state never defined

  return {showTips: tipsRank !== -1};
})(ClockCombo);
