import React from 'react';
import Widget from 'laboratory/widget';

/******************************************************************************/

// This component is a vertical scrollable container, which stores the relative
// position of the scroller, to restore the same position when it is mounted again.

class ScrollableContainer extends Widget {
  constructor() {
    super(...arguments);

    this.handleScroll = this.handleScroll.bind(this);
    this.node = null;
    this.useState = false; // does not work with true!
  }

  componentWillUnmount() {
    if (this.node) {
      this.node.removeEventListener('scroll', this.handleScroll);
    }
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
    if (node) {
      this.node = node;
      node.addEventListener('scroll', this.handleScroll);

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
  }

  // Called whenever the scroller is moved.
  handleScroll(e) {
    if (this.isHorizontal) {
      const max = e.target.scrollWidth - e.target.offsetWidth;
      const top = e.target.scrollLeft;
      const pos = max > 0 ? top / max : 0;
      if (this.getScrollPos('horizontalScrollPos') !== pos) {
        this.setScrollPos('horizontalScrollPos', pos);
      }
    }
    if (this.isVertical) {
      const max = e.target.scrollHeight - e.target.offsetHeight;
      const top = e.target.scrollTop;
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
    if (this.useState) {
      const state = this.getWidgetState();
      if (state) {
        pos = state.get(field);
      }
    } else {
      if (
        window.document &&
        window.document.scrollableContainer &&
        window.document.scrollableContainer[this.props.id] &&
        window.document.scrollableContainer[this.props.id][field]
      ) {
        pos = window.document.scrollableContainer[this.props.id][field];
      }
    }
    // console.log(`getScrollPos id='${this.props.id}' field='${field}' pos='${pos}'`);
    return pos; // return 0..1
  }

  // Set the relative position, between 0 and 1.
  setScrollPos(field, pos) {
    if (!this.props.id) {
      throw new Error('Missing id in ScrollableContainer');
    }

    // console.log(`setScrollPos id='${this.props.id}' field='${field}' pos='${pos}'`);
    if (this.useState) {
      // dispatch does not work because it causes a redraw!
      this.dispatch({type: 'SET', field, pos});
    } else {
      if (!window.document.scrollableContainer) {
        window.document.scrollableContainer = {};
      }
      if (!window.document.scrollableContainer[this.props.id]) {
        window.document.scrollableContainer[this.props.id] = {};
      }
      window.document.scrollableContainer[this.props.id][field] = pos;
    }
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
