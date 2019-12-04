//T:2019-02-27
import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'goblin-laboratory/widgets/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import * as styles from './styles';

/******************************************************************************/

// Dynamic toolbar, which comes out of its hole (from left to right) when the
// mouse hovers over a small button '>'. Initially, the toolbar is hidden.
// This component draws the small button and the toolbar, and handles all
// interactions related.
class DynamicToolbar extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      showToolbar: false,
    };

    this.toolbar = null;
    this.counter = 0;

    this.onShowToolbar = this.onShowToolbar.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  get showToolbar() {
    return this.state.showToolbar;
  }

  set showToolbar(value) {
    this.setState({
      showToolbar: value,
    });
  }

  onShowToolbar() {
    const node = ReactDOM.findDOMNode(this.toolbarButton);
    const rect = node.getBoundingClientRect();
    this.ToolbarLeft = rect.left;
    this.ToolbarTop = rect.top;

    this.counter = 5;
    this.showToolbar = true;
  }

  // When the mouse moves out the toolbar, hide the toolbar.
  onMouseMove(e) {
    if (this.counter > 0) {
      // For prevent quick show / hide sequences.
      this.counter--;
      return;
    }

    let x = e.clientX;
    let y = e.clientY;

    const node = ReactDOM.findDOMNode(this.toolbar);
    const rect = node.getBoundingClientRect();
    const margin = this.props.detectMargin ? this.props.detectMargin : 20;
    if (
      x < rect.left - margin ||
      x > rect.right + margin ||
      y < rect.top - margin ||
      y > rect.bottom + margin
    ) {
      this.showToolbar = false;
    }
  }

  // Draws the discrete small button.
  renderHoverButton() {
    const style = this.styles.classNames.hoverButton;
    return (
      <div className={style}>
        <Button
          width="24px"
          height="24px"
          kind="dynamic-toolbar-top-left"
          glyph={this.props.glyph || 'solid/ellipsis-h'}
          mouseOver={this.onShowToolbar}
          ref={node => (this.toolbarButton = node)}
        />
      </div>
    );
  }

  // Draws a full-screen area behind the toolbar, for the mechanism to hide the toolbar.
  renderFullScreen() {
    if (this.showToolbar) {
      const fullScreenClass = this.styles.classNames.fullScreen;
      return <div className={fullScreenClass} onMouseMove={this.onMouseMove} />;
    } else {
      return null; // nothing if toolbar is hidden
    }
  }

  // Draws the toolbar and the buttons it contains.
  // It is always present, to allow a show / hide animation.
  renderToolbar() {
    const boxClass = this.showToolbar
      ? this.styles.classNames.boxVisible // toolbar visible
      : this.styles.classNames.boxHidden; // toolbar hidden to left

    return (
      <div className={boxClass} ref={x => (this.toolbar = x)}>
        {this.props.children}
      </div>
    );
  }

  render() {
    const mainClass = this.styles.classNames.main;
    return (
      <div className={mainClass}>
        {this.renderFullScreen()}
        {this.renderToolbar()}
        {this.renderHoverButton()}
      </div>
    );
  }
}

/******************************************************************************/
export default DynamicToolbar;
