import React from 'react';
import Widget from 'laboratory/widget';
import DialogModal from 'goblin-gadgets/widgets/dialog-modal/widget';
import Label from 'gadgets/label/widget';
import Button from 'gadgets/button/widget';
import T from 't';
import TT from 'nabu/t/widget';
import withC from 'goblin-laboratory/widgets/connect-helpers/with-c';

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

  renderType(fieldType) {
    if (typeof fieldType === 'string') {
      return (
        <TT msgid={fieldType} className={this.styles.classNames.itemType} />
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

  renderItem(level, fieldName, fieldType, selection) {
    if (typeof fieldType === 'string') {
      const p = fieldType.split('@');
      if (p.length > 1) {
        fieldType = p[1];
      }
    }

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
        {this.renderType(fieldType)}
      </div>
    );
  }

  renderItems(level, subValue, selection) {
    const list = this.props.state.get(subValue);
    if (!list || typeof list === 'string') {
      return null;
    }

    const items = [];
    for (const [key, value] of list) {
      items.push(this.renderItem(level, key, value, selection));
    }
    return items;
  }

  renderColumn(level, subValue, selection) {
    const r = this.renderItems(level, subValue, selection);
    if (!r) {
      return null;
    }
    return (
      <div key={level} className={this.styles.classNames.column}>
        {r}
      </div>
    );
  }

  renderColumns() {
    const result = [];
    const parts = this.value ? this.value.split('.') : ['_'];
    let subValue = '';
    for (let level = 0; level <= parts.length; level++) {
      const selection = parts[level];
      const r = this.renderColumn(level, subValue, selection);
      if (!r) {
        break;
      }
      result.push(r);
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
    const list = this.props.state.get(this.value);
    const disabled = list && typeof list !== 'string';

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
        width="800px"
        height="600px"
        left={r.right + 40 + 'px'}
        center={centerY + 'px'}
        triangleShift={shiftY + 'px'}
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
