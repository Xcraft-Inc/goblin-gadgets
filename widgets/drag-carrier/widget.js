import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'laboratory/widget';
import {Unit} from 'electrum-theme';

import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';

/******************************************************************************/

function getVRect (rect, top, bottom) {
  return {
    left: rect.left,
    right: rect.right,
    top: top,
    bottom: bottom,
    width: rect.width,
    height: bottom - top,
  };
}

function getHRect (rect, left, right) {
  return {
    left: left,
    right: right,
    top: rect.top,
    bottom: rect.bottom,
    width: right - left,
    height: rect.height,
  };
}

function isInside (rect, x, y) {
  if (rect && rect.left < rect.right && rect.top < rect.bottom) {
    return (
      x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
    );
  } else {
    return true;
  }
}

function subBottomMargin (rect, bm) {
  return {
    left: rect.left,
    right: rect.right,
    top: rect.top,
    bottom: rect.bottom - bm,
    width: rect.width,
    height: rect.height - bm,
  };
}

function getBoundingRect (node) {
  const rect = node.getBoundingClientRect ();
  if (node.dataset.verticalSpacing) {
    const vs = Unit.parse (node.dataset.verticalSpacing).value;
    return subBottomMargin (rect, vs);
  } else {
    return rect;
  }
}

function clipDot (p, box) {
  p.x = Math.max (p.x, box.left);
  p.x = Math.min (p.x, box.right);
  p.y = Math.max (p.y, box.top);
  p.y = Math.min (p.y, box.bottom);
  return p;
}

function clip (rect, box) {
  if (rect && box) {
    const tl = clipDot ({x: rect.left, y: rect.top}, box);
    const br = clipDot ({x: rect.right, y: rect.bottom}, box);
    return {
      left: tl.x,
      right: br.x,
      top: tl.y,
      bottom: br.y,
      width: br.x - tl.x,
      height: br.y - tl.y,
    };
  }
  return rect;
}

/******************************************************************************/

class DragCarrier extends Widget {
  constructor () {
    super (...arguments);
    this.state = {
      x: 0,
      y: 0,
      dest: null,
    };
    this.moveCount = 0;
    this.startX = 0;
    this.startY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.rectOrigin = null;
    this.lastDragStarted = false;
    this.selectedIds = [];

    this.onMouseMove = this.onMouseMove.bind (this);
    this.onMouseUp = this.onMouseUp.bind (this);
  }

  componentDidMount () {
    super.componentDidMount ();

    if (
      window.document.flyingDialogs &&
      window.document.flyingDialogs.length > 0
    ) {
      const flyingDialog =
        window.document.flyingDialogs[window.document.flyingDialogs.length - 1];
      const node = ReactDOM.findDOMNode (flyingDialog);
      this.flyingDialogRect = node.getBoundingClientRect ();
    }
  }

  get x () {
    return this.state.x;
  }

  set x (value) {
    this.setState ({
      x: value,
    });
  }

  get y () {
    return this.state.y;
  }

  set y (value) {
    this.setState ({
      y: value,
    });
  }

  get dest () {
    return this.state.dest;
  }

  set dest (value) {
    this.setState ({
      dest: value,
    });
  }

  isDragStarted () {
    return this.moveCount > 2;
  }

  getHalfThickness () {
    return Unit.parse (Unit.multiply (this.props.thickness, 0.5)).value;
  }

  getOverSpacing () {
    if (this.props.overSpacing) {
      return Unit.parse (Unit.multiply (this.props.overSpacing, 1)).value;
    } else {
      return 0;
    }
  }

  findV (container, node, y, parentRect) {
    const thickness = this.getHalfThickness ();
    const overSpacing = this.getOverSpacing () / 2;
    if (container.props.dragMode === 'all') {
      const rect = getBoundingRect (node);
      return {
        id: null,
        ownerId: container.props.dragOwnerId,
        ownerKind: container.props.dragSource,
        rect: rect.height === 0
          ? getVRect (rect, rect.top, rect.top + thickness * 2)
          : rect,
        opacity: 1.0,
        radius: '0px',
        parentRect: parentRect,
        index: -1,
      };
    }
    if (node.children.length === 0) {
      // is in top of empty container ?
      const rect = getBoundingRect (node);
      return {
        id: null,
        ownerId: container.props.dragOwnerId,
        ownerKind: container.props.dragSource,
        rect: getVRect (rect, rect.top - thickness, rect.top + thickness),
        parentRect: parentRect,
        index: 0,
      };
    }
    for (var i = 0, len = node.children.length; i < len; i++) {
      const t = node.children[i];
      const rect = getBoundingRect (t);
      const oy = rect.top + rect.height / 2;
      if (y < oy) {
        // is upper middle ?
        let py = rect.top;
        if (i > 0) {
          // not top first element ?
          const lt = node.children[i - 1];
          const lr = getBoundingRect (lt);
          py = (lr.bottom + rect.top) / 2;
        }
        py -= overSpacing;
        return {
          id: t.dataset.id,
          ownerId: t.dataset.ownerId
            ? t.dataset.ownerId
            : container.props.dragOwnerId,
          ownerKind: container.props.dragSource,
          rect: getVRect (rect, py - thickness, py + thickness),
          parentRect: parentRect,
          index: i,
        };
      }
    }
    // At the end of container (after the last element).
    const last = node.children[node.children.length - 1];
    const rect = last.getBoundingClientRect ();
    return {
      id: null, // after last
      ownerId: container.props.dragOwnerId,
      ownerKind: container.props.dragSource,
      rect: getVRect (
        rect,
        rect.bottom - overSpacing - thickness,
        rect.bottom - overSpacing + thickness
      ),
      parentRect: parentRect,
      index: node.children.length,
    };
  }

  findH (container, node, x, parentRect) {
    const thickness = this.getHalfThickness ();
    const overSpacing = this.getOverSpacing () / 2;
    if (container.props.dragMode === 'all') {
      const rect = getBoundingRect (node);
      return {
        id: null,
        ownerId: container.props.dragOwnerId,
        ownerKind: container.props.dragSource,
        rect: rect.width === 0
          ? getHRect (rect, rect.left, rect.left + thickness * 2)
          : rect,
        opacity: 1.0,
        radius: '0px',
        parentRect: parentRect,
        index: -1,
      };
    }
    if (node.children.length === 0) {
      // is in top of empty container ?
      const rect = getBoundingRect (node);
      return {
        id: null,
        ownerId: container.props.dragOwnerId,
        ownerKind: container.props.dragSource,
        rect: getHRect (rect, rect.left - thickness, rect.left + thickness),
        parentRect: parentRect,
        index: 0,
      };
    }
    for (var i = 0, len = node.children.length; i < len; i++) {
      const t = node.children[i];
      const rect = getBoundingRect (t);
      const ox = rect.left + rect.width / 2;
      if (x < ox) {
        // is upper middle ?
        let px = rect.left;
        if (i > 0) {
          // not top first element ?
          const lt = node.children[i - 1];
          const lr = getBoundingRect (lt);
          px = (lr.right + rect.left) / 2;
        }
        px -= overSpacing;
        return {
          id: t.dataset.id,
          ownerId: t.dataset.ownerId
            ? t.dataset.ownerId
            : container.props.dragOwnerId,
          ownerKind: container.props.dragSource,
          rect: getHRect (rect, px - thickness, px + thickness),
          parentRect: parentRect,
          index: i,
        };
      }
    }
    // At the end of container (after the last element).
    const last = node.children[node.children.length - 1];
    const rect = last.getBoundingClientRect ();
    return {
      id: null, // after last
      ownerId: container.props.dragOwnerId,
      ownerKind: container.props.dragSource,
      rect: getHRect (
        rect,
        rect.right - overSpacing - thickness,
        rect.right - overSpacing + thickness
      ),
      parentRect: parentRect,
      index: node.children.length,
    };
  }

  findParentId (id) {
    if (id && window.document.dragParentControllers) {
      for (var c of window.document.dragParentControllers) {
        if (c.props.dragParentId === id) {
          return c;
        }
      }
    }
    return null;
  }

  getParentRect (container) {
    const dragParentId = container.props.dragOwnerId;
    const parent = this.findParentId (dragParentId);
    if (parent) {
      const parentNode = ReactDOM.findDOMNode (parent);
      return parentNode.getBoundingClientRect ();
    }
    return null;
  }

  findViewId (id) {
    if (id && window.document.viewIds) {
      for (var c of window.document.viewIds) {
        if (c.props.viewId === id) {
          return c;
        }
      }
    }
    return null;
  }

  getViewParentRect (container) {
    const dragParentId = container.props.viewParentId;
    const parent = this.findViewId (dragParentId);
    if (parent) {
      let parentNode = ReactDOM.findDOMNode (parent);
      if (parent.props.backToClass) {
        // Moves back to a parent whose class begins with a given name.
        // Typically, "firstPane" finds the name "firstPane_1pucuno".
        // See note [DispatchBacklogDetail.1]
        while (
          !parentNode.classList[0].startsWith (parent.props.backToClass + '_')
        ) {
          parentNode = parentNode.parentNode;
        }
      }
      return parentNode.getBoundingClientRect ();
    }
    return null;
  }

  find (x, y) {
    const dragCab = this.searchDragCab (this.props.dragOwnerId);
    const dragController = dragCab.read ('dragController');
    for (var container of window.document.dragControllers) {
      const dc = container.props.dragController;
      if (dc === dragController) {
        const node = ReactDOM.findDOMNode (container);
        const rect = node.getBoundingClientRect ();
        const vpr = this.getViewParentRect (container);
        const pr = this.getParentRect (container);
        const parentRect = clip (vpr, pr);
        if (isInside (parentRect, x, y) && isInside (rect, x, y)) {
          if (this.props.direction === 'horizontal') {
            return this.findH (container, node, x, parentRect);
          } else {
            return this.findV (container, node, y, parentRect);
          }
        }
      }
    }
    return null;
  }

  findNodeOrigin (container, node, id) {
    for (var i = 0, len = node.children.length; i < len; i++) {
      const t = node.children[i];
      if (t.dataset.id === id) {
        let rect = getBoundingRect (t);
        //? if (this.props.direction === 'horizontal') {
        //?   rect = getHRect (
        //?     rect,
        //?     rect.left,
        //?     rect.right - this.props.overSpacing
        //?   );
        //? } else {
        //?   rect = getVRect (
        //?     rect,
        //?     rect.top,
        //?     rect.bottom - this.props.overSpacing
        //?   );
        //? }
        const parentRect = this.getViewParentRect (container);
        return {
          container: container,
          ticket: t,
          id: t.dataset.id,
          ownerId: container.props.dragOwnerId,
          rect: rect,
          parentRect: parentRect,
          index: i,
        };
      }
    }
    return null;
  }

  // Return the description of origin, whith is the full rectangle of item origin.
  findOrigin () {
    for (var container of window.document.dragControllers) {
      const dc = container.props.dragController;
      if (dc === this.props.dragController) {
        const node = ReactDOM.findDOMNode (container);
        const rect = this.findNodeOrigin (
          container,
          node,
          this.props.dragOwnerId
        );
        if (rect) {
          return rect;
        }
      }
    }
    return null;
  }

  searchDragCab (id) {
    for (let dragCab of window.document.dragCabs) {
      if (dragCab.props.dragOwnerId === id) {
        return dragCab;
      }
    }
    return null;
  }

  searchChildren (id) {
    const container = this.rectOrigin.container;
    if (
      container.props.children.props &&
      container.props.children.props.dragOwnerId === id
    ) {
      // Manages the case where there is only one child.
      return container.props.children;
    }
    for (let child of container.props.children) {
      if (child.props.dragOwnerId === id) {
        return child;
      }
    }
    return null;
  }

  selectOne (id, value) {
    // Trace.log ('DragCarrier.selectOne');
    const dragCab = this.searchDragCab (id);
    dragCab.dragStarting = value;
    if (value) {
      this.selectedIds.push (id);
    }
  }

  isSelected (data, id) {
    //? return ReducerData.ask (data, {type: 'IS_TICKET_SELECTED', id: id});
    return false;
  }

  selectMulti (value) {
    // Trace.log ('DragCarrier.selectMulti');
    if (this.rectOrigin) {
      const origin = this.searchChildren (this.rectOrigin.id);
      if (
        origin &&
        origin.props.ticket &&
        this.isSelected (this.props.data, origin.props.ticket.id)
      ) {
        // Drag all selected items.
        const container = this.rectOrigin.container;
        for (let child of container.props.children) {
          if (this.isSelected (this.props.data, child.props.ticket.id)) {
            this.selectOne (child.props.ticket.id, value);
          }
        }
      } else {
        // Drag only pointed item.
        this.selectOne (this.rectOrigin.id, value);
      }
    }
  }

  onMouseMove (e) {
    let x = e.clientX;
    let y = e.clientY;
    if (!x && e.touches.length > 0) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    }
    if (!x || !y) {
      return;
    }
    if (this.moveCount === 0) {
      // first move ?
      this.startX = x;
      this.startY = y;
      const dragCab = this.searchDragCab (this.props.dragOwnerId);
      const node = ReactDOM.findDOMNode (dragCab);
      const rect = node.getBoundingClientRect ();
      this.offsetX = x - rect.left;
      this.offsetY = y - rect.top;
      this.rectOrigin = this.findOrigin ();
    }
    this.moveCount++;

    if (this.props.mode === 'corner-top-left') {
      this.x = x;
      this.y = y;
    } else {
      // keep mouse at click point
      this.x = x - this.offsetX;
      this.y = y - this.offsetY;
    }

    const dest = this.find (x, y);
    if (
      dest &&
      this.rectOrigin &&
      dest.ownerId === this.rectOrigin.ownerId &&
      (dest.index === this.rectOrigin.index ||
        dest.index === this.rectOrigin.index + 1 ||
        dest.index === -1)
    ) {
      //? this.dest = this.rectOrigin;
      this.dest = null; // if dest = himself -> no feedback
    } else {
      this.dest = dest;
    }

    if (!this.lastDragStarted && this.isDragStarted ()) {
      this.lastDragStarted = true;
      this.selectMulti (true);
    }
  }

  onMouseUp (e) {
    // Trace.log ('DragCarrier.mouseUp');
    const dragEnding = this.props.dragEnding;
    if (dragEnding) {
      dragEnding (e, this.isDragStarted ());
      if (this.isDragStarted ()) {
        this.selectMulti (false);
        const dest = this.dest;
        if (dest) {
          const doDragEnding = this.props.doDragEnding;
          if (doDragEnding) {
            doDragEnding (
              this.selectedIds,
              dest.id,
              dest.ownerId,
              dest.ownerKind
            );
          }
        }
      }
    }
  }

  renderTooMany (n, index) {
    const text = `Et encore ${n} autres...`;
    return (
      <Container key={index} kind="drag-too-many">
        <Label text={text} />
      </Container>
    );
  }

  renderOneComponentToDrag (id, index) {
    const dragCab = this.searchDragCab (id);
    if (dragCab) {
      return dragCab.renderForDrag (true, index);
    } else {
      return null;
    }
  }

  renderComponentToDrag () {
    const result = [];
    if (this.isDragStarted ()) {
      const n = this.selectedIds.length;
      for (let i = 0; i < n; i++) {
        const id = this.selectedIds[i];
        const r = this.renderOneComponentToDrag (id, i);
        if (r) {
          const rest = n - i;
          if (i > 5 && rest > 1) {
            result.push (this.renderTooMany (rest, i));
            break;
          }
          result.push (r);
        }
      }
    }
    return result;
  }

  render () {
    const fullScreenClass = this.styles.classNames.fullScreen;

    const ox = this.flyingDialogRect ? this.flyingDialogRect.left : 0;
    const oy = this.flyingDialogRect ? this.flyingDialogRect.top : 0;

    const dest = this.dest;
    let hilitedStyle;
    if (dest && dest.rect && this.isDragStarted ()) {
      const rect = clip (dest.rect, dest.parentRect);
      hilitedStyle = {
        visibility: 'visible',
        position: 'absolute',
        left: rect.left - ox,
        width: rect.width,
        top: rect.top - oy,
        height: rect.height,
        borderRadius: dest.radius ? dest.radius : this.props.radius,
        transition: 'all 0.2s ease-out',
        backgroundColor: this.props.color,
        opacity: dest.opacity ? dest.opacity : 1.0,
        userSelect: 'none',
      };
    } else {
      hilitedStyle = {
        visibility: 'hidden',
        position: 'absolute',
        borderRadius: this.props.radius,
        transition: 'all 0.2s ease-out',
        backgroundColor: this.props.color,
        opacity: 0,
        userSelect: 'none',
      };
    }

    const draggedStyle = {
      visibility: 'visible',
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      height: this.props.dragHeight,
      left: this.x - ox,
      top: this.y - oy,
      opacity: 0.9,
      userSelect: 'none',
    };

    return (
      <div
        className={fullScreenClass}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        onTouchMove={this.onMouseMove}
        onTouchEnd={this.onMouseUp}
      >
        <div style={hilitedStyle} />
        <div style={draggedStyle}>
          {this.renderComponentToDrag ()}
        </div>
      </div>
    );
  }
}

/******************************************************************************/
export default DragCarrier;
