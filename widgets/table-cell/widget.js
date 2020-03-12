//T:2019-02-27

import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Shredder from 'xcraft-core-shredder';
import * as Bool from 'goblin-gadgets/widgets/helpers/bool-helpers';
import * as styles from './styles';
import {converters as Converters} from 'xcraft-core-converters';
import {Unit} from 'electrum-theme';
import Label from 'goblin-gadgets/widgets/label/widget';

/******************************************************************************/

function getDisplayedText(text, type, cellFormat) {
  const converter =
    type && type !== 'string' && type !== 'markdown' && type !== 'enum'
      ? Converters.getConverter(type)
      : null;

  if (converter) {
    // Use xcraft-core-converters to convert.
    return converter.getDisplayed(text);
  } else {
    // Return canonical value for unknown type (fallback).
    return typeof text === 'string' && cellFormat !== 'original'
      ? text.replace(/\n/g, ', ')
      : text;
  }
}

function isNabu(t) {
  return (
    t.get('nabuId') ||
    t.get('_type') === 'translatableString' ||
    t.get('_type') === 'translatableMarkdown'
  );
}

/******************************************************************************/

class TableCell extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.state = {
      changingWidthX: null,
    };

    this.startPosX = null;
    this.newWidth = null;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.onStartChangeWidth = this.onStartChangeWidth.bind(this);
    this.onChangeWidth = this.onChangeWidth.bind(this);
    this.onEndChangeWidth = this.onEndChangeWidth.bind(this);
  }

  //#region get/set
  get changingWidthX() {
    return this.state.changingWidthX;
  }

  set changingWidthX(value) {
    this.setState({
      changingWidthX: value,
    });
  }
  //#endregion

  onMouseDown() {
    if (this.startPosX) {
      return;
    }

    const x = this.props.selectionChanged;
    if (x) {
      x(this.props.rowId);
    }
  }

  onDoubleClick() {
    if (this.startPosX) {
      return;
    }

    const x = this.props.onDoubleClick;
    if (x) {
      x(this.props.rowId);
    }
  }

  onStartChangeWidth(e) {
    this.changingWidthX = e.clientX;
    this.startPosX = e.clientX;
  }

  onChangeWidth(e) {
    if (!this.changingWidthX) {
      return;
    }

    this.changingWidthX = e.clientX;

    e.preventDefault();
    e.stopPropagation();
  }

  onEndChangeWidth() {
    this.changingWidthX = null;
    this.startPosX = null;

    const x = this.props.widthChanged;
    if (x) {
      x(this.props.rowId, this.newWidth);
    }
  }

  /******************************************************************************/

  renderWidthButton() {
    if (
      !Bool.isTrue(this.props.isHeader) ||
      !this.props.widthChanged ||
      this.changingWidthX
    ) {
      return null;
    }

    return (
      <div
        className={this.styles.classNames.widthButton}
        onMouseDown={this.onStartChangeWidth}
      />
    );
  }

  renderChangingWidth() {
    if (!this.changingWidthX) {
      return null;
    }

    const w = Unit.parse(this.props.width).value;
    const l = this.startPosX - w - 10;
    this.newWidth = this.changingWidthX - l - 10 + 'px';

    const styleColumn = {
      left: l - 5 + 'px',
      width: this.changingWidthX - l + 5 + 'px',
      display: this.changingWidthX >= l ? null : 'none',
    };

    const style = {
      left: Math.max(this.changingWidthX, l) - 2 + 'px',
    };

    return (
      <div
        className={this.styles.classNames.changingWidthFullscreen}
        onMouseMove={this.onChangeWidth}
        onMouseUp={this.onEndChangeWidth}
      >
        <div
          className={this.styles.classNames.changingWidthMarkColumn}
          style={styleColumn}
        />
        <div
          className={this.styles.classNames.changingWidthMark}
          style={style}
        />
      </div>
    );
  }

  renderLabel() {
    let glyph = null;
    let glyphColor = null;
    let textColor = null;
    let text = null;
    let weight = null;
    if (
      this.props.text &&
      this.props.text instanceof Shredder &&
      !isNabu(this.props.text)
    ) {
      // In this case, the props text is a Shredder, but not a T() !
      glyph = this.props.text.get('glyph');
      glyphColor = this.props.text.get('glyphColor');
      textColor = this.props.text.get('textColor');
      text = this.props.text.get('text');
      weight = this.props.text.get('weight');
    } else {
      glyph = this.props.glyph;
      text = this.props.text;
    }
    text = getDisplayedText(text, this.props.type, this.props.cellFormat);

    let cursor = null;
    if (Bool.isTrue(this.props.isSortable)) {
      cursor = 'pointer';
    }

    return (
      <div
        key={this.props.index}
        className={this.styles.classNames.tableCell}
        onMouseDown={this.onMouseDown}
        onDoubleClick={this.props.onDoubleClick}
      >
        <Label
          kind={
            Bool.isTrue(this.props.isHeader) && glyph
              ? 'table-cell-sorting-header'
              : 'table-cell'
          }
          cursor={cursor}
          glyph={glyph}
          glyphColor={glyphColor}
          textColor={textColor}
          text={text}
          // userSelect="all" // for debug
          weight={weight}
          justify={this.props.textAlign}
          horizontalSpacing={this.props.horizontalSpacing}
          wrap={this.props.wrap}
          markdownVerticalSpacing={this.context.theme.spacing.lineSpacing}
        >
          {this.props.children}
        </Label>
        {this.renderWidthButton()}
        {this.renderChangingWidth()}
      </div>
    );
  }

  // Table accept a function in text, to render a specific component.
  renderFunction() {
    return (
      <div
        key={this.props.index}
        className={this.styles.classNames.tableCell}
        onMouseDown={this.onMouseDown}
        onDoubleClick={this.props.onDoubleClick}
      >
        {this.props.text()}
      </div>
    );
  }

  render() {
    if (typeof this.props.text === 'function') {
      return this.renderFunction();
    } else {
      return this.renderLabel();
    }
  }
}

/******************************************************************************/
export default TableCell;
