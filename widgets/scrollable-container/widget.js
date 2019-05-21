//T:2019-02-27

import React from 'react';
import Widget from 'laboratory/widget';

/******************************************************************************/

// This component is a scrollable container, which stores the relative positions
// of the scrollers, to restore the same positions when it is mounted again.

class ScrollableContainer extends Widget {
  constructor() {
    super(...arguments);

    this._node = null;
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.unmount();
  }

  get isHorizontal() {
    return (
      this.props.direction === 'horizontal' || this.props.direction === 'both'
    );
  }

  get isVertical() {
    return (
      !this.props.direction ||
      this.props.direction === 'vertical' ||
      this.props.direction === 'both'
    );
  }

  // scrollHeight is a measurement of the height of an element's content,
  // including content not visible on the screen due to overflow.
  //
  // offsetHeight is the height of the element including vertical padding
  // and borders, as an integer.

  // Called once, when the component is mounted.
  mount(node) {
    if (!node || !this.props.restoreScroll) {
      return;
    }

    this._node = node;
    if (this.isHorizontal) {
      const max = node.scrollWidth - node.offsetWidth;
      const left = this.getScrollPos('horizontalScrollPos') * max;
      node.scroll({left});
    }
    if (this.isVertical) {
      const max = node.scrollHeight - node.offsetHeight;
      const top = this.getScrollPos('verticalScrollPos') * max;
      node.scroll({top});
    }
  }

  // Called whenever the scroller is moved.
  unmount() {
    if (!this._node || !this.props.restoreScroll) {
      return;
    }

    if (this.isHorizontal) {
      const max = this._node.scrollWidth - this._node.offsetWidth;
      const top = this._node.scrollLeft;
      const pos = max > 0 ? top / max : 0;
      if (this.getScrollPos('horizontalScrollPos') !== pos) {
        this.setScrollPos('horizontalScrollPos', pos);
      }
    }
    if (this.isVertical) {
      const max = this._node.scrollHeight - this._node.offsetHeight;
      const top = this._node.scrollTop;
      const pos = max > 0 ? top / max : 0;
      if (this.getScrollPos('verticalScrollPos') !== pos) {
        this.setScrollPos('verticalScrollPos', pos);
      }
    }
  }

  // Get the relative position, between 0 and 1.
  getScrollPos(field) {
    if (!this.props.id) {
      throw new Error('Missing id in ScrollableContainer');
    }

    let pos = 0;
    const state = this.getWidgetCacheState(this.widgetId);
    if (state) {
      pos = state.get(field);
    }

    return pos; // return 0..1
  }

  // Set the relative position, between 0 and 1.
  setScrollPos(field, pos) {
    if (!this.props.id) {
      throw new Error('Missing id in ScrollableContainer');
    }

    this.dispatchToCache(this.widgetId, {[field]: pos});
  }

  /******************************************************************************/

  render() {
    const {disabled, index} = this.props;

    return (
      <div
        key={index}
        ref={node => this.mount(node)}
        className={this.styles.classNames.box}
        disabled={disabled}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </div>
    );
  }
}

/******************************************************************************/
export default ScrollableContainer;
