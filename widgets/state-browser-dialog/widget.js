import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import DialogModal from 'goblin-gadgets/widgets/dialog-modal/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import T from 't';
import TT from 'goblin-nabu/widgets/t/widget';
import withC from 'goblin-laboratory/widgets/connect-helpers/with-c';
import {Unit} from 'goblin-theme';
const px = Unit.toPx;

/******************************************************************************/

function isFinal(node) {
  if (typeof node !== 'object') {
    return true;
  }
  const type = node.get('type');
  const defaultValue = node.get('defaultValue');
  return !!type && defaultValue !== undefined;
}

function getType(node) {
  if (typeof node === 'object') {
    return node.get('type');
  } else {
    return '?';
  }
}

/******************************************************************************/

class StateBrowserDialog extends Widget {
  constructor() {
    super(...arguments);

    this.state = {
      value: this.props.value,
    };

    this.onAccept = this.onAccept.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onClickItem = this.onClickItem.bind(this);
  }

  //#region get/set
  get value() {
    return this.state.value;
  }

  set value(value) {
    this.setState({
      value: value,
    });
  }
  //#endregion

  onAccept() {
    this.props.onAccept(this.value);
  }

  onClose() {
    this.props.onClose();
  }

  onClickItem(level, fieldName) {
    const parts = this.value.split('.');
    const array = [];
    for (let i = 0; i < level && i < parts.length; i++) {
      array.push(parts[i]);
    }
    if (level > parts.length || parts[level] !== fieldName) {
      array.push(fieldName);
    }
    this.value = array.join('.');
  }

  isExclude(node) {
    if (this.props.filter && isFinal(node)) {
      const type = getType(node);
      return this.props.filter.includes(type);
    }
    return false;
  }

  /******************************************************************************/

  renderHeader() {
    return (
      <div className={this.styles.classNames.header}>
        <Label
          kind="title"
          textColor={this.context.theme.palette.stateBrowserBackText}
          text={this.props.title}
        />
      </div>
    );
  }

  renderType(node) {
    if (isFinal(node)) {
      return (
        <TT msgid={getType(node)} className={this.styles.classNames.itemType} />
      );
    } else {
      return (
        <Label
          glyph="solid/chevron-right"
          justify="end"
          glyphPosition="right"
        />
      );
    }
  }

  renderItem(level, fieldName, node, selection) {
    const style =
      fieldName === selection
        ? this.styles.classNames.itemSelected
        : this.styles.classNames.item;

    return (
      <div
        key={fieldName}
        className={style}
        onClick={() => this.onClickItem(level, fieldName)}
      >
        <TT msgid={fieldName} className={this.styles.classNames.itemName} />
        {this.renderType(node)}
      </div>
    );
  }

  renderItems(level, node, selection) {
    const items = [];
    const sortedNode = new Map([...node].sort());
    for (const [key, value] of sortedNode) {
      if (key !== 'id' && !this.isExclude(value)) {
        items.push(this.renderItem(level, key, value, selection));
      }
    }
    return items;
  }

  renderColumn(level, node, selection) {
    return (
      <div key={level} className={this.styles.classNames.column}>
        {this.renderItems(level, node, selection)}
      </div>
    );
  }

  renderColumns() {
    const result = [];
    const parts = this.value ? this.value.split('.') : ['_'];
    let subValue = '';
    for (let level = 0; level <= parts.length; level++) {
      const node = this.props.state.get(subValue);
      if (isFinal(node)) {
        break;
      }
      const selection = parts[level];
      result.push(this.renderColumn(level, node, selection));
      if (subValue) {
        subValue += '.';
      }
      subValue += selection;
    }
    return result;
  }

  renderContent() {
    return (
      <div className={this.styles.classNames.content}>
        {this.renderColumns()}
      </div>
    );
  }

  renderFooter() {
    const node = this.props.state.get(this.value);
    const disabled = !isFinal(node);

    return (
      <div className={this.styles.classNames.footer}>
        <Label text={this.value} grow="1" wrap="no" />
        <Button
          kind="action"
          place="1/2"
          width="160px"
          glyph={this.props.acceptGlyph || 'solid/plus'}
          text={this.props.acceptText || T('Ajouter')}
          disabled={disabled}
          onClick={this.onAccept}
        />
        <Button
          kind="action"
          place="2/2"
          width="160px"
          glyph="solid/times"
          text={T('Annuler')}
          onClick={this.onClose}
        />
      </div>
    );
  }

  render() {
    if (!this.props.state) {
      return null;
    }

    const windowHeight = window.innerHeight;
    const r = this.props.parentButtonRect;
    const count = this.props.numberOfCheckboxes;
    const height = Math.min(Math.max(count * 20 + 100, 200), windowHeight - 20);
    let centerY = r.top + r.height / 2;

    let shiftY = 0;
    if (centerY - height / 2 < 10) {
      const offset = height / 2 - centerY + 10;
      centerY += offset;
      shiftY = -offset;
    }
    if (centerY + height / 2 > windowHeight - 10) {
      const offset = centerY + height / 2 - (windowHeight - 10);
      centerY -= offset;
      shiftY = offset;
    }

    return (
      <DialogModal
        width="850px"
        height="600px"
        left={px(r.right + 40)}
        center={px(centerY)}
        triangleShift={px(shiftY)}
        backgroundClose={true}
        close={this.onClose}
      >
        <div className={this.styles.classNames.stateBrowserDialog}>
          {this.renderHeader()}
          {this.renderContent()}
          {this.renderFooter()}
        </div>
      </DialogModal>
    );
  }
}

/******************************************************************************/

export default withC(StateBrowserDialog);
