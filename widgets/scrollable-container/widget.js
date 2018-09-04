import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'laboratory/widget';
const Bool = require('gadgets/helpers/bool-helpers');

/******************************************************************************/

class ScrollableContainer extends Widget {
  constructor() {
    super(...arguments);

    this.handleScroll = this.handleScroll.bind(this);
  }

  get scrollTop() {
    if (!this.props.id) {
      throw new Error('Missing id in ScrollableContainer');
    }

    if (
      window.document &&
      window.document.scrollableContainer &&
      window.document.scrollableContainer[this.props.id]
    ) {
      return window.document.scrollableContainer[this.props.id];
    } else {
      return 0;
    }
    //- const state = this.getState().widgets.get(this.props.id);
    //- if (state) {
    //-   const pos = state.get('value');
    //-   console.log(`getScrollTop id='${this.props.id}' pos='${pos}'`);
    //-   return pos;
    //- } else {
    //-   console.log(`getScrollTop null`);
    //-   return 0;
    //- }
  }

  set scrollTop(value) {
    if (!this.props.id) {
      throw new Error('Missing id in ScrollableContainer');
    }

    if (!window.document.scrollableContainer) {
      window.document.scrollableContainer = {};
    }
    window.document.scrollableContainer[this.props.id] = value;
    //- console.log(`setScrollTop id='${this.props.id}' pos='${value}'`);
    //- this.dispatch({
    //-   type: 'SCROLL_TOP',
    //-   id: this.props.id,
    //-   value: value,
    //- });
  }

  componentDidMount() {
    //- console.log('ScrollableContainer2.componentDidMount');
    super.componentDidMount();

    const node = ReactDOM.findDOMNode(this);
    node.addEventListener('scroll', this.handleScroll);

    node.scroll({
      top: this.scrollTop,
    });
  }

  componentWillUnmount() {
    //- console.log('ScrollableContainer2.componentWillUnmount');
    const node = ReactDOM.findDOMNode(this);
    node.removeEventListener('scroll', this.handleScroll);
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

  /******************************************************************************/

  render() {
    const {disabled, index} = this.props;

    return (
      <div
        key={index}
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
