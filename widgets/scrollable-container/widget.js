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
  }

  set scrollTop(value) {
    if (!this.props.id) {
      throw new Error('Missing id in ScrollableContainer');
    }

    if (!window.document.scrollableContainer) {
      window.document.scrollableContainer = {};
    }
    window.document.scrollableContainer[this.props.id] = value;
  }

  componentDidMount() {
    super.componentDidMount();

    const node = ReactDOM.findDOMNode(this);
    node.addEventListener('scroll', this.handleScroll);

    node.scroll({
      top: this.scrollTop,
    });
  }

  componentWillUnmount() {
    const node = ReactDOM.findDOMNode(this);
    node.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
    // const max = e.target.scrollHeight - e.target.offsetHeight;
    // const top = e.target.scrollTop;
    // const pos = max > 0 ? top / max : 0;
    this.scrollTop = e.target.scrollTop;
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
