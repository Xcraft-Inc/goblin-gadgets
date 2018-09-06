import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'laboratory/widget';
const Bool = require('gadgets/helpers/bool-helpers');

/******************************************************************************/

class ScrollableContainer extends Widget {
  constructor() {
    super(...arguments);

    this.handleScroll = this.handleScroll.bind(this);
    this.node = null;
  }

  componentWillUnmount() {
    if (this.node) {
      this.node.removeEventListener('scroll', this.handleScroll);
    }
  }

  handleScroll(e) {
    //- console.log('ScrollableContainer2.handleScroll');
    // const max = e.target.scrollHeight - e.target.offsetHeight;
    // const top = e.target.scrollTop;
    // const pos = max > 0 ? top / max : 0;
    const pos = e.target.scrollTop;
    if (this.scrollTop !== pos) {
      this.scrollTop = pos;
    }
  }

  get scrollTop() {
    if (!this.props.id) {
      throw new Error('Missing id in ScrollableContainer');
    }

    let pos = 0;
    const useState = false;
    if (useState) {
      const state = this.getState().widgets.get(this.props.id);
      if (state) {
        pos = state.get('value');
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
    //- console.log(`getScrollTop id='${this.props.id}' pos='${pos}'`);
    return pos;
  }

  set scrollTop(value) {
    if (!this.props.id) {
      throw new Error('Missing id in ScrollableContainer');
    }

    //- console.log(`setScrollTop id='${this.props.id}' pos='${value}'`);
    const useState = false;
    if (useState) {
      this.dispatch({
        type: 'SCROLL_TOP',
        id: this.props.id,
        value: value,
      });
    } else {
      if (!window.document.scrollableContainer) {
        window.document.scrollableContainer = {};
      }
      window.document.scrollableContainer[this.props.id] = value;
    }
  }

  /******************************************************************************/

  render() {
    const {disabled, index} = this.props;

    return (
      <div
        key={index}
        ref={node => {
          if (node) {
            this.node = node;
            node.addEventListener('scroll', this.handleScroll);
            node.scroll({
              top: this.scrollTop,
            });
          }
        }}
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
