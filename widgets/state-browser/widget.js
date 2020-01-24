import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import DialogModal from 'goblin-gadgets/widgets/dialog-modal/widget';
import TextField from 'goblin-gadgets/widgets/text-field/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import * as styles from './styles';
import Shredder from 'xcraft-core-shredder';
import withC from 'goblin-laboratory/widgets/connect-helpers/with-c';
import TT from 'nabu/t/widget';

/******************************************************************************/

// Remove last part of a path.
// ex: "test.hello.a" => "test.hello"
function removeLastKey(path) {
  let position = path.lastIndexOf('.');
  if (position === -1) {
    return '';
  }
  path = path.substr(0, position);
  return path;
}

/******************************************************************************/

let StateBrowser = class StateBrowser extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.onClickItem = this.onClickItem.bind(this);
    this.onClickBack = this.onClickBack.bind(this);
    this.onClickValue = this.onClickValue.bind(this);
    this.handleOnShowDialog = this.handleOnShowDialog.bind(this);
    this.handleOnCloseDialog = this.handleOnCloseDialog.bind(this);

    this.containerRef = null;

    this.state = {
      showDialog: false,
      buildedPath: removeLastKey(this.props.value),
    };

    // Initialize with props or default value.
    let {itemHeight, itemWidth} = this.props;
    if (itemWidth) {
      itemWidth = parseInt(itemWidth.split('px')[0]);
    }
    if (itemHeight) {
      itemHeight = parseInt(itemHeight.split('px')[0]);
    }
    this.item = {width: itemWidth || 300, height: itemHeight || 32};
  }

  onClickValue(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  onClickBack() {
    this.setState({buildedPath: removeLastKey(this.state.buildedPath)});
  }

  // Handle browsing into entity.
  onClickItem(value) {
    if (this.state.buildedPath !== '') {
      value = '.' + value;
    }
    const newPath = this.state.buildedPath + value;

    // Add last part of path, move in if it's not a value (end of a branch).
    if (Shredder.isShredder(this.props.state.get(newPath))) {
      this.setState({buildedPath: newPath});
    } else {
      this.onClickValue(newPath);
      this.handleOnCloseDialog();
    }
  }

  handleOnShowDialog() {
    this.setState({
      showDialog: true,
      buildedPath: removeLastKey(this.props.value),
    });
  }

  handleOnCloseDialog() {
    this.setState({showDialog: false});
  }

  /******************************************************************************/

  renderGlyph(glyph, justify) {
    const position = {start: 'left', end: 'right', center: 'center'}[justify];
    return <Label glyph={glyph} justify={justify} glyphPosition={position} />;
  }

  renderBack() {
    return (
      <div
        key="_back"
        className={this.styles.classNames.back}
        onClick={this.onClickBack}
      >
        {this.renderGlyph('solid/chevron-left', 'center')}
      </div>
    );
  }

  renderPath() {
    let text = this.props.path;
    const p = text ? text.split('@') : null;
    if (p && p.length > 0) {
      text = p[1];
    }

    return <div className={this.styles.classNames.headerPath}>{text}</div>;
  }

  renderHeader() {
    return (
      <div className={this.styles.classNames.header}>
        {this.empty ? null : this.renderBack()}
        {this.renderPath()}
      </div>
    );
  }

  renderType(type) {
    if (typeof type === 'string') {
      return <TT msgid={type} className={this.styles.classNames.itemType} />;
    } else {
      return this.renderGlyph('solid/chevron-right', 'end');
    }
  }

  renderItem(key, value) {
    if (typeof value === 'string') {
      const p = value.split('@');
      if (p.length > 1) {
        value = p[1];
      }
    }

    // TODO : Implement mode to edit values.
    return (
      <div
        key={key}
        className={this.styles.classNames.item}
        onClick={() => this.onClickItem(key)}
      >
        <TT msgid={key} className={this.styles.classNames.itemName} />
        {this.renderType(value)}
      </div>
    );
  }

  renderItems() {
    // Loop foreach key of an element.
    // TODO : Implement blacklist to hide keys we don't want to show.
    const items = [];
    for (const [key, value] of this.props.state.get(this.state.buildedPath)) {
      items.push(this.renderItem(key, value));
    }
    return items;
  }

  renderDialog() {
    this.empty = this.state.buildedPath === '';
    if (!this.state.showDialog || !this.containerRef) {
      return null;
    }

    const size =
      this.props.state.get(this.state.buildedPath).size * this.item.height;

    const windowHeight = window.innerHeight;
    const containerHeight = Math.min(
      Math.max(50 + size + 20 * 2, 200),
      windowHeight - 20
    );
    const containerWidth = this.item.width;

    let {left, top, width, height} = this.containerRef.getBoundingClientRect();
    const triangleSize = 33;
    // Calculate position X of the element.
    left = left + width + triangleSize + 'px';

    // Calculate position Y of the element.
    let center = top + height / 2;
    let shiftY = 0;
    // Handle case when container get out of the screen.
    if (center - containerHeight / 2 < 10) {
      const offset = containerHeight / 2 - center + 10;
      center += offset;
      shiftY = -offset;
    }
    if (center + containerHeight / 2 > windowHeight - 10) {
      const offset = center + containerHeight / 2 - (windowHeight - 10);
      center -= offset;
      shiftY = offset;
    }

    return (
      <DialogModal
        left={left}
        center={center + 'px'}
        triangleShift={shiftY + 'px'}
        width={containerWidth + 'px'}
        height={containerHeight + 'px'}
        backgroundClose={true}
        close={this.handleOnCloseDialog}
      >
        <div className={this.styles.classNames.content}>
          {this.renderHeader()}
          <div className={this.styles.classNames.scrollable}>
            {this.renderItems()}
          </div>
        </div>
      </DialogModal>
    );
  }

  renderTextField() {
    return (
      <TextField
        grow="1"
        selectAllOnFocus={false}
        readonly={true}
        value={this.props.value}
        tooltip={this.props.tooltip}
        horizontalSpacing="overlap"
      />
    );
  }

  renderButton() {
    if (this.props.readonly) {
      return null;
    }

    return (
      <Button
        kind="combo"
        vpos="top"
        shape="right-smooth"
        glyph="solid/chevron-right"
        onClick={this.handleOnShowDialog}
      />
    );
  }

  render() {
    if (!Shredder.isShredder(this.props.state)) {
      console.error('StateBrowser: Require immutable in entry!');
      return null;
    }

    return (
      <React.Fragment>
        <div
          className={this.styles.classNames.container}
          ref={node => (this.containerRef = node)}
        >
          {this.renderTextField()}
          {this.renderButton()}
        </div>
        {this.renderDialog()}
      </React.Fragment>
    );
  }
};

/******************************************************************************/

export default withC(StateBrowser, {value: 'onChange'});
