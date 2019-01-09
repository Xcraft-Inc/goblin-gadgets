import React from 'react';
import Widget from 'laboratory/widget';
import Shredder from 'xcraft-core-shredder';
const Bool = require('gadgets/helpers/bool-helpers');

import {
  date as DateConverters,
  time as TimeConverters,
  price as PriceConverters,
} from 'xcraft-core-converters';

import Label from 'gadgets/label/widget';

/******************************************************************************/

function getDisplayedText(text, type) {
  switch (type) {
    case 'date':
      return DateConverters.getDisplayed(text);
    case 'time':
      return TimeConverters.getDisplayed(text);
    case 'price':
      return PriceConverters.getDisplayed(text);
    default:
      return text;
  }
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

  renderComponent(props, glyph, glyphColor, text, weight) {
    if (typeof text === 'string') {
      return (
        <Label
          kind="table-cell"
          glyph={glyph}
          glyphColor={glyphColor}
          text={text}
          weight={weight}
          justify={this.props.textAlign}
          wrap={this.props.wrap}
        />
      );
    } else if (typeof text === 'function') {
      // Probably a React component
      return text();
    } else {
      return text;
    }
  }

  render() {
    let glyph = null;
    let glyphColor = null;
    let text = null;
    let weight = null;

    if (this.props.text && this.props.text instanceof Shredder) {
      glyph = this.props.text.get('glyph');
      glyphColor = this.props.text.get('glyphColor');
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
<<<<<<< HEAD
        {this.renderComponent(this.props, glyph, glyphColor, text, weight)}
=======
        <Label
          kind={
            this.props.isHeader && glyph
              ? 'table-cell-sorting-header'
              : 'table-cell'
          }
          cursor={cursor}
          glyph={glyph}
          glyphColor={glyphColor}
          text={text}
          weight={weight}
          justify={this.props.textAlign}
          spacing={this.props.spacing}
          wrap={this.props.wrap}
        />
>>>>>>> master
      </div>
    );
  }
}

/******************************************************************************/
export default TableCell;
