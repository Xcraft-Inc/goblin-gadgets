import React from 'react';
import Widget from 'laboratory/widget';

class Button extends Widget {
  constructor (props) {
    super (props);
  }

  readActive () {
    const active = this.read ('active');
    const selected = this.read ('selected');
    if (active || active !== 'false') {
      return active;
    } else if (selected || selected !== 'false') {
      return selected;
    } else {
      return 'false';
    }
  }

  get wiring () {
    return {
      id: 'id',
      kind: 'kind',
      text: 'text',
      glyph: 'glyph',
    };
  }

  setText (text) {
    this.do ('text', {text});
  }

  setKind (kind) {
    this.do ('kind', {kind});
  }

  onClicked (e) {
    if (this.props.onClick) {
      this.props.onClick (e);
    }
  }

  // Called when the button is clicked.
  onShowMenu () {
    // Trace.log ('>>>> showMenu <<<<');
    /*const internalState = this.getInternalState ();
    let isMenuVisible = internalState.get ('isMenuVisible');
    if (isMenuVisible === 'true') {
      isMenuVisible = 'false';
    } else {
      isMenuVisible = 'true';
    }
    internalState.set ('isMenuVisible', isMenuVisible);*/
  }

  onMouseDown (e) {
    // Trace.log ('Button.mouseDown');
    const disabled = this.read ('disabled');
    if (disabled === 'true') {
      return;
    }
    const mouseDown = this.read ('mouse-down');
    if (mouseDown) {
      mouseDown (e);
    }
  }

  onMouseUp (e) {
    const disabled = this.read ('disabled');
    if (disabled === 'true') {
      return;
    }
    const mouseUp = this.read ('mouse-up');
    if (mouseUp) {
      mouseUp (e);
    }
  }

  isMenuVisible () {
    // Get or create the internalState.
    const menu = this.read ('menu');
    if (menu) {
      let internalState = this.getInternalState ();
      if (!internalState.get ('isMenuVisible')) {
        // At first time, initialize internalState.isMenuVisible with false.
        internalState = internalState.set ('isMenuVisible', 'false');
      }
      return internalState.get ('isMenuVisible');
    } else {
      return 'false';
    }
  }

  renderBadge () {
    const badgeValue = this.read ('badge-value');
    if (badgeValue) {
      return null; //FIXME: <Badge value={badgeValue} layer="over" {...this.link ()} />;
    } else {
      return null;
    }
  }

  renderTriangle () {
    const kind = this.read ('kind');
    const active = this.readActive ();
    if (kind === 'main-tab' && active === 'true') {
      const style = this.styles.triangle;
      return <div style={style} key="triangle" />;
    } else {
      return null;
    }
  }

  renderMenu () {
    if (this.isMenuVisible () === 'true') {
      const menu = this.read ('menu');
      const style = this.styles.menuBox;
      return (
        <div style={style} key="menu">
          {
            //FIXME: <Menu items={menu} {...this.link ()} />
          }
        </div>
      );
    } else {
      return null;
    }
  }

  renderGlyph () {
    const glyph = this.read ('glyph');
    if (glyph) {
      const rotate = this.read ('rotate');
      const flip = this.read ('flip');
      const spin = this.read ('spin');
      const style = this.styles.glyph;
      return (
        <i
          key="icon"
          style={style}
          className={`fa
            fa-${glyph}
            fa-rotate-${rotate}
            fa-flip-${flip}
            ${spin ? 'fa-spin' : ''}`}
        />
      );
    } else {
      return null;
    }
  }

  renderText () {
    const text = this.read ('text');
    if (text) {
      const style = this.styles.text;
      return (
        <label key="text" style={style}>
          {text}
        </label>
      );
    } else {
      return null;
    }
  }

  renderShortcut () {
    const shortcut = this.read ('shortcut');
    if (shortcut) {
      const style = this.mergeStyles ('shortcut');
      return (
        <label key="shortcut" style={style}>
          {
            //FIXME: ShortcutHelpers.getShortcut (shortcut)
          }
        </label>
      );
    } else {
      return null;
    }
  }

  renderLayout () {
    const result = [];
    const glyphPosition = this.read ('glyph-position');
    if (glyphPosition === 'right') {
      result.push (this.renderText ());
      result.push (this.renderShortcut ());
      result.push (this.renderGlyph ());
    } else {
      result.push (this.renderGlyph ());
      result.push (this.renderText ());
      result.push (this.renderShortcut ());
    }
    return result;
  }

  widget () {
    return props => {
      const index = this.read ('index');
      const kind = this.read ('kind');
      const menu = this.read ('menu');
      const toAnchor = this.read ('to-anchor');
      const show = this.read ('show');
      const text = this.read ('text');
      let tooltip = this.read ('tooltip');

      if (kind === 'pane-navigator') {
        tooltip = text;
      }

      const style = this.styles.box;

      if (show === 'false') {
        return null;
      } else if (kind === 'container' || kind === 'box') {
        return (
          <div
            key={index}
            onClick={::this.onClicked} // voir (*)
            onMouseDown={::this.onMouseDown}
            onMouseUp={::this.onMouseUp}
            onTouchStart={::this.onMouseDown}
            onTouchEnd={::this.onMouseUp}
            style={style}
            title={tooltip}
          >
            {this.props.children}
          </div>
        );
      } else if (menu) {
        return (
          <div
            key={index}
            onClick={::this.onShowMenu} // voir (*)
            onMouseDown={::this.onMouseDown}
            onMouseUp={::this.onMouseUp}
            onTouchStart={::this.onMouseDown}
            onTouchEnd={::this.onMouseUp}
            style={style}
            title={tooltip}
          >
            {this.renderLayout ()}
            {this.renderTriangle ()}
            {this.renderBadge ()}
            {this.renderMenu ()}
            {this.props.children}
          </div>
        );
      } else if (toAnchor) {
        return (
          <a
            key={index}
            onClick={::this.onClicked} // voir (*)
            onMouseDown={::this.onMouseDown}
            onMouseUp={::this.onMouseUp}
            onTouchStart={::this.onMouseDown}
            onTouchEnd={::this.onMouseUp}
            style={style}
            title={tooltip}
            href={'#' + toAnchor}
          >
            {this.renderLayout ()}
            {this.renderTriangle ()}
            {this.renderBadge ()}
            {this.renderMenu ()}
            {this.props.children}
          </a>
        );
      } else {
        return (
          <div
            key={index}
            onClick={::this.onClicked} // voir (*)
            onMouseDown={::this.onMouseDown}
            onMouseUp={::this.onMouseUp}
            onTouchStart={::this.onMouseDown}
            onTouchEnd={::this.onMouseUp}
            style={style}
            title={tooltip}
          >
            {this.renderLayout ()}
            {this.renderTriangle ()}
            {this.renderBadge ()}
            {this.renderMenu ()}
            {this.props.children}
          </div>
        );
      }
    };
    // (*) je n'arrive pas à généraliser cela !!!
  }
}

export default Button;
