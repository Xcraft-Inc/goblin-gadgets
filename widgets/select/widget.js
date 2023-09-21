//T:2019-02-27
import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import MouseTrap from 'mousetrap';
import * as RectHelpers from '../helpers/rect-helpers.js';

import Container from 'goblin-gadgets/widgets/container/widget';
import Separator from 'goblin-gadgets/widgets/separator/widget';
import * as styles from './styles';

/******************************************************************************/

class Select extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
    this.comboContainer = null;
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCloseCombo = this.onCloseCombo.bind(this);
  }

  UNSAFE_componentWillMount() {
    MouseTrap.bind('esc', this.onCloseCombo);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    MouseTrap.unbind('esc');
  }

  onCloseCombo() {
    const close = this.props.close;
    if (close) {
      close();
    }
  }

  onMouseDown(e) {
    const rect = this.comboContainer.getBoundingClientRect();
    if (!RectHelpers.isInside(rect, e.clientX, e.clientY)) {
      // If the mouse is outside the menu combo, close it.
      this.onCloseCombo();
    }
  }

  onActionAndClose(item) {
    item.action(item);
    this.onCloseCombo();
  }

  onChange(element) {
    const index = element.target.value;
    const item = this.props.list[index];
    this.onActionAndClose(item);
  }

  renderItem(item, index) {
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

  renderCombo() {
    const result = [];
    let index = 0;
    for (let item of this.props.list) {
      result.push(this.renderItem(item, index++));
    }
    return result;
  }

  render() {
    const fullScreenClass = this.styles.classNames.fullScreen;
    const comboClass = this.styles.classNames.combo;
    const insideClass = this.styles.classNames.inside;
    const selectClass = this.styles.classNames.select;

    return (
      <div
        className={fullScreenClass}
        onMouseDown={this.onMouseDown}
        onTouchStart={this.onMouseDown}
      >
        <div ref={(ref) => (this.comboContainer = ref)} className={comboClass}>
          <Container
            kind="flying-combo"
            trianglePosition={this.props.top ? 'top' : 'bottom'}
            width={this.props.width}
            place={this.props.bottom ? 'over' : 'under'}
          >
            <div className={insideClass}>
              <select
                className={selectClass}
                size={this.props.list.length}
                onChange={this.onChange}
                defaultValue={this.props.defaultIndex}
              >
                {this.renderCombo()}
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
