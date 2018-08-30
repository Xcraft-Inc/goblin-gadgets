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

  componentDidMount() {
    super.componentDidMount();

    if (Bool.isTrue(this.props.scrollable)) {
      //? const node = ReactDOM.findDOMNode(this);
      //? node.addEventListener('scroll', this.handleScroll);
      window.addEventListener('scroll', ::this.handleScroll);
    }
  }

  componentWillUnmount() {
    if (Bool.isTrue(this.props.scrollable)) {
      window.removeEventListener('scroll', ::this.handleScroll);
    }
  }

  handleScroll(e) {
    var winHeight = window.innerHeight;

    // Annoying to compute doc height due to browser inconsistency.
    var body = document.body;
    var html = document.documentElement;
    var docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    var value = document.body.scrollTop;
    console.log(
      `handleScroll: winHeight=${winHeight} docHeight=${docHeight} value=${value}`
    );
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
