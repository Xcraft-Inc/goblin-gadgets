import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as Bool from 'goblin-gadgets/widgets/helpers/bool-helpers';

import Button from 'goblin-gadgets/widgets/button/widget';
import FlatList from '../flat-list/widget';
import ComboContainer from '../combo-container/widget';

/******************************************************************************/

export default class ButtonCombo extends Widget {
  constructor() {
    super(...arguments);

    this.state = {
      showCombo: false,
    };

    this.comboLocation = null;
    this.showCombo = this.showCombo.bind(this);
    this.hideCombo = this.hideCombo.bind(this);
    this.setRef = this.setRef.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  setRef(node) {
    this.node = node;
  }

  showCombo() {
    this.setState({
      showCombo: true,
    });

    if (this.props.onShowCombo) {
      this.props.onShowCombo();
    }
  }

  hideCombo() {
    this.setState({
      showCombo: false,
    });

    if (this.props.onHideCombo) {
      this.props.onHideCombo();
    }
  }

  onChange(item) {
    if (this.props.onChange) {
      this.props.onChange(item);
    }
    this.hideCombo();
  }

  renderButton() {
    if (Bool.isTrue(this.props.readonly) || this.props.hideButtonCombo) {
      return;
    }
    let glyph = this.state.showCombo ? 'solid/caret-up' : 'solid/caret-down';
    if (this.props.comboGlyph) {
      glyph = this.props.comboGlyph;
    }

    const shape = this.props.shape || 'smooth';
    const buttonShapes = {
      smooth: 'right-smooth',
      rounded: 'right-rounded',
    };
    const buttonShape = buttonShapes[shape];

    return (
      <Button
        kind="combo"
        vpos="top"
        glyph={glyph}
        glyphSize="120%"
        shape={buttonShape}
        disabled={
          Bool.isTrue(this.props.disabled) || Bool.isTrue(this.props.readonly)
        }
        onClick={this.showCombo}
      />
    );
  }

  renderCombo() {
    return (
      <ComboContainer
        show={this.state.showCombo}
        positionRef={this.node}
        onClose={this.hideCombo}
      >
        <FlatList
          list={this.props.list}
          selectedId={this.props.selectedId}
          menuType={this.props.menuType}
          menuItemWidth={this.props.menuItemWidth}
          onChange={this.onChange}
          onEscKey={this.hideCombo}
          ref={this.props.setListRef}
        />
      </ComboContainer>
    );
  }

  render() {
    if (Bool.isFalse(this.props.show)) {
      return null;
    }

    const boxClass = this.state.showCombo
      ? this.styles.classNames.shadowBox
      : this.props.focus
      ? this.styles.classNames.focusedBox
      : this.styles.classNames.box;

    return (
      <span
        ref={this.setRef}
        onClick={
          Bool.isTrue(this.props.restrictsToList) && !this.state.showCombo
            ? this.showCombo
            : undefined
        }
        disabled={
          Bool.isTrue(this.props.disabled) || Bool.isTrue(this.props.readonly)
        }
        className={boxClass}
      >
        {this.props.children}
        {this.renderButton()}
        {this.renderCombo()}
      </span>
    );
  }
}

/******************************************************************************/
