//T:2019-02-27

import React from 'react';
import Widget from 'laboratory/widget';
import Shredder from 'xcraft-core-shredder';
import * as Bool from 'gadgets/helpers/bool-helpers';

import {
  date as DateConverters,
  time as TimeConverters,
  datetime as DateTimeConverters,
  price as PriceConverters,
} from 'xcraft-core-converters';

import Label from 'goblin-gadgets/widgets/label/widget';

/******************************************************************************/

function getDisplayedText(text, type) {
  switch (type) {
    case 'date':
      return DateConverters.getDisplayed(text);
    case 'time':
      return TimeConverters.getDisplayed(text);
    case 'datetime':
      return DateTimeConverters.getDisplayed(text);
    case 'price':
      return PriceConverters.getDisplayed(text);
    default:
      return typeof text === 'string' ? text.replace(/\n/g, ', ') : text;
  }
}

function isNabu(t) {
  return t.get('nabuId') || t.get('_type') === 'translatableString';
}

/******************************************************************************/

class TableCell extends Widget {
  constructor() {
    super(...arguments);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
  }

  onMouseDown() {
    const x = this.props.selectionChanged;
    if (x) {
      x(this.props.rowId);
    }
  }

  onDoubleClick() {
    const x = this.props.onDoubleClick;
    if (x) {
      x(this.props.rowId);
    }
  }

  /******************************************************************************/

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
    text = getDisplayedText(text, this.props.type);

    let cursor = null;
    if (Bool.isTrue(this.props.isSortable)) {
      cursor = 'pointer';
    }

    return (
      <div
        key={this.props.index}
        className={this.styles.classNames.cell}
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
          userSelect="all"
          weight={weight}
          justify={this.props.textAlign}
          horizontalSpacing={this.props.horizontalSpacing}
          wrap={this.props.wrap}
        >
          {this.props.children}
        </Label>
      </div>
    );
  }

  // Table accept a function in text, to render a specific component.
  renderFunction() {
    return (
      <div
        key={this.props.index}
        className={this.styles.classNames.cell}
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
