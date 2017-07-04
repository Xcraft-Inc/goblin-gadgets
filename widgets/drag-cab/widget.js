import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'laboratory/widget';
import {Unit} from 'electrum-theme';

import DragCarrier from 'gadgets/drag-carrier/widget';

/******************************************************************************/

function isInside (rect, x, y) {
  if (rect && rect.left < rect.right && rect.top < rect.bottom) {
    return (
      x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
    );
  } else {
    return true;
  }
}

function getBoundingRect (theme, container) {
  const node = ReactDOM.findDOMNode (container);
  return node.getBoundingClientRect ();
}

// Return the property 'drag-controller' of the rectangle targeted by the
// mouse (x, y). If there are several imbricated rectangles, it is necessary
// to take the one whose surface is the smallest !
function findDragController (theme, x, y) {
  let dc = null;
  let minSurface = Number.MAX_SAFE_INTEGER;
  for (var container of window.document.dragControllers) {
    const rect = getBoundingRect (theme, container);
    const surface = rect.width * rect.height;
    if (isInside (rect, x, y) && surface < minSurface) {
      dc = container.props['drag-controller'];
      minSurface = surface;
    }
  }
  return dc;
}

/******************************************************************************/

class DragCab extends Widget {
  constructor (props) {
    super (props);
    this.state = {
      dragInProcess: false,
      dragStarting: false,
    };
    this.dragHeight = 0;
    this.hasCombo = false;
  }

  get dragInProcess () {
    return this.state.dragInProcess;
  }

  set dragInProcess (value) {
    this.setState ({
      dragInProcess: value,
    });
  }

  get dragStarting () {
    return this.state.dragStarting;
  }

  set dragStarting (value) {
    this.setState ({
      dragStarting: value,
    });
  }

  componentDidMount () {
    super.componentDidMount ();

    const id = this.props['drag-owner-id'];
    if (!id) {
      throw new Error ('DragCab has not drag-owner-id');
    }
    if (!window.document.dragCabs) {
      window.document.dragCabs = [];
    }
    window.document.dragCabs.push (this);
  }

  componentWillUnmount () {
    const index = window.document.dragCabs.indexOf (this);
    if (index !== -1) {
      window.document.dragCabs.splice (index, 1);
    }
  }

  onMouseDown (e) {
    if (this.hasCombo) {
      // does a child have an open combo-menu ?
      return;
    }
    const mouseDown = this.props['mouse-down'];
    if (mouseDown && mouseDown (e)) {
      return;
    }
    const noDrag = this.props['no-drag'];
    if (noDrag === 'true') {
      return; // if drag prohibited, don't initiate drag & drop ?
    }
    const dc = findDragController (this.props.theme, e.clientX, e.clientY);
    if (!dc || dc !== this.props['drag-controller']) {
      // When clicking in a ticket of a messenger, 2 different drags try to start.
      // The first to move the ticket (drag-controller = 'ticket') and the second
      // to move the messenger (drag-controller = 'roadbook').
      // The second one should not be started. It must start only when a click in
      // the header of the messenger !
      return;
    }
    const node = ReactDOM.findDOMNode (this);
    const dragWidthtDetect = this.props['drag-width-detect'];
    if (dragWidthtDetect) {
      const w = Unit.parse (dragWidthtDetect).value;
      const rect = node.getBoundingClientRect ();
      if (e.clientX > rect.left + w) {
        return;
      }
    }
    const dragHeightDetect = this.props['drag-height-detect'];
    if (dragHeightDetect) {
      const h = Unit.parse (dragHeightDetect).value;
      const rect = node.getBoundingClientRect ();
      if (e.clientY > rect.top + h) {
        return;
      }
    }
    this.dragHeight = node.clientHeight;
    this.dragInProcess = true;
  }

  onMouseUp (e) {
    // Trace.log ('DragCab.mouseUp');
    if (this.hasCombo) {
      // does a child have an open combo-menu ?
      return;
    }
    const mouseUp = this.props['mouse-up'];
    if (mouseUp && mouseUp (e)) {
      return;
    }
    const noDrag = this.props['no-drag'];
    if (noDrag === 'true') {
      // simple click when drag prohibited ?
      this.doClickAction (e);
    }
  }

  onDragEnding (e, isDragDoing) {
    // Trace.log ('DragCab.onDragEnding');
    this.dragInProcess = false;
    this.dragStarting = false;
    if (!isDragDoing) {
      // simple click done ?
      this.doClickAction (e);
    }
  }

  doClickAction (e) {
    const action = this.props['do-click-action'];
    if (action) {
      action (e);
    }
  }

  renderDragCarrier () {
    const direction = this.props.direction;
    const color = this.props.color;
    const thickness = this.props.thickness;
    const radius = this.props.radius;
    const overSpacing = this.props['over-spacing'];
    const mode = this.props.mode;
    const data = this.props.data;
    const dragOwnerId = this.props['drag-owner-id'];
    const dragController = this.props['drag-controller'];
    const doDragEnding = this.props['do-drag-ending'];
    return (
      <DragCarrier
        direction={direction}
        color={color}
        thickness={thickness}
        radius={radius}
        over-spacing={overSpacing}
        mode={mode}
        data={data}
        do-drag-ending={doDragEnding}
        drag-ending={this.onDragEnding}
        drag-height={this.dragHeight}
        drag-controller={dragController}
        drag-owner-id={dragOwnerId}
      />
    );
  }

  renderChildren (isDragged, dragStarting) {
    return React.Children.map (this.props.children, c => {
      return React.cloneElement (c, {
        isDragged: isDragged,
        hasHeLeft: dragStarting,
      });
    });
  }

  renderForDrag (isDragged, index) {
    const dragOwnerId = this.props['drag-owner-id'];
    const direction = this.props.direction;
    const verticalSpacing = this.props['vertical-spacing'];
    const dragInProcess = this.dragInProcess;
    const dragStarting = this.dragStarting;

    const htmlDragCarrier = dragInProcess && !isDragged
      ? this.renderDragCarrier ()
      : null;

    const boxStyle = {
      userSelect: 'none',
    };
    if (direction === 'horizontal') {
      boxStyle.display = 'flex';
      boxStyle.flexDirection = 'column';
      boxStyle.flexGrow = isDragged && dragStarting ? 1 : null;
    }

    return (
      <div
        key={index}
        style={boxStyle}
        data-id={dragOwnerId}
        data-vertical-spacing={verticalSpacing}
        onMouseDown={::this.onMouseDown}
        onMouseUp={::this.onMouseUp}
        onTouchStart={::this.onMouseDown}
        onTouchEnd={::this.onMouseUp}
      >
        {this.renderChildren (isDragged, dragStarting)}
        {htmlDragCarrier}
      </div>
    );
  }

  render () {
    return this.renderForDrag (false);
  }
}

/******************************************************************************/
export default DragCab;
