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
    return this.props.direction === 'horizontal';
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
        const left = this.scrollPos * max;
        node.scroll({left});
      } else {
        const max = node.scrollHeight - node.offsetHeight;
        const top = this.scrollPos * max;
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
      if (this.scrollPos !== pos) {
        this.scrollPos = pos;
      }
    } else {
      const max = e.target.scrollHeight - e.target.offsetHeight;
      const top = e.target.scrollTop;
      const pos = max > 0 ? top / max : 0;
      if (this.scrollPos !== pos) {
        this.scrollPos = pos;
      }
    }
  }

  // Get the relative position, between 0 and 1.
  get scrollPos() {
    if (!this.props.id) {
      throw new Error('Missing id in ScrollableContainer');
    }

    let pos = 0;
    if (this.useState) {
      const state = this.getWidgetState();
      if (state) {
        pos = state.get('scrollPos');
      }
    } else {
      if (
        window.document &&
        window.document.scrollableContainer &&
        window.document.scrollableContainer[this.props.id]
      ) {
        pos = window.document.scrollableContainer[this.props.id];
      }
    }
    // console.log(`getScrollPos id='${this.props.id}' pos='${pos}'`);
    return pos; // return 0..1
  }

  // Set the relative position, between 0 and 1.
  set scrollPos(pos) {
    if (!this.props.id) {
      throw new Error('Missing id in ScrollableContainer');
    }

    // console.log(`setScrollPos id='${this.props.id}' pos='${value}'`);
    if (this.useState) {
      // dispatch does not work because it causes a redraw!
      this.dispatch({type: 'SET', field: 'scrollPos', pos});
    } else {
      if (!window.document.scrollableContainer) {
        window.document.scrollableContainer = {};
      }
      window.document.scrollableContainer[this.props.id] = pos;
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
