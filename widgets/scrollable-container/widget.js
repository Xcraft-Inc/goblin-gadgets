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

    const node = ReactDOM.findDOMNode(this);
    node.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    const node = ReactDOM.findDOMNode(this);
    node.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(e) {
    const max = e.target.scrollHeight - e.target.offsetHeight;
    const top = e.target.scrollTop;
    const pos = max > 0 ? top / max : 0;
    console.log(`handleScroll: pos=${pos}`);
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
