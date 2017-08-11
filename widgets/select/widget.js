import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'laboratory/widget';
import MouseTrap from 'mousetrap';
import {Unit} from 'electrum-theme';
import {ColorHelpers} from 'electrum-theme';
import * as GlyphHelpers from '../helpers/glyph-helpers.js';
import * as RectHelpers from '../helpers/rect-helpers.js';

import Container from 'gadgets/container/widget';
import Button from 'gadgets/button/widget';
import Separator from 'gadgets/separator/widget';

/******************************************************************************/

class Select extends Widget {
  constructor () {
    super (...arguments);
  }

  componentWillMount () {
    MouseTrap.bind ('esc', ::this.onCloseCombo);
  }

  componentWillUnmount () {
    MouseTrap.unbind ('esc');
  }

  onCloseCombo () {
    const close = this.props.close;
    if (close) {
      close ();
    }
  }

  onMouseDown (e) {
    const node = ReactDOM.findDOMNode (this);
    const rect = node.children[0].getBoundingClientRect ();
    if (!RectHelpers.isInside (rect, e.clientX, e.clientY)) {
      // If the mouse is outside the menu combo, close it.
      this.onCloseCombo ();
    }
  }

  onActionAndClose (item) {
    item.action (item);
    this.onCloseCombo ();
  }

  onChange (element) {
    const index = element.target.value;
    const list = this.props.list;
    const item = list[index];
    this.onActionAndClose (item);
  }

  renderItem (item, index) {
    if (item.separator) {
      return <Separator key={index} kind="menu-separator" />;
    } else {
      const optionClass = this.styles.classNames.option;
      return (
        <option key={index} className={optionClass} value={index}>
          {item.text}
        </option>
      );
    }
  }

  renderCombo () {
    const list = this.props.list;
    const result = [];
    let index = 0;
    for (let item of list) {
      result.push (this.renderItem (item, index++));
    }
    return result;
  }

  render () {
    const top = this.props.top;
    const width = Unit.sub (
      this.props.width,
      Unit.multiply (this.context.theme.shapes.flyingBalloonPadding, 2)
    );

    const fullScreenClass = this.styles.classNames.fullScreen;
    const comboClass = this.styles.classNames.combo;
    const insideClass = this.styles.classNames.inside;
    const selectClass = this.styles.classNames.select;

    return (
      <div
        className={fullScreenClass}
        onMouseDown={::this.onMouseDown}
        onTouchStart={::this.onMouseDown}
      >
        <div className={comboClass}>
          <Container
            kind="flying-balloon"
            trianglePosition={'none'}
            width={width}
          >
            <div className={insideClass}>
              <select
                className={selectClass}
                size={this.props.list.length}
                onChange={::this.onChange}
                defaultValue={this.props.defaultIndex}
              >
                {this.renderCombo ()}
              </select>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

/******************************************************************************/
export default Select;
