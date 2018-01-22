import React from 'react';
import Widget from 'laboratory/widget';
import {isImmutable} from 'immutable';

import Label from 'gadgets/label/widget';

/******************************************************************************/

class TableCell extends Widget {
  constructor () {
    super (...arguments);

    this.onMouseDown = this.onMouseDown.bind (this);
  }

  onMouseDown () {
    const x = this.props.selectionChanged;
    if (x) {
      x (this.props.rowId);
    }
  }

  render () {
    let glyph = null;
    let glyphColor = null;
    let text = null;
    if (isImmutable (this.props.text)) {
      glyph = this.props.text.get ('glyph');
      glyphColor = this.props.text.get ('glyphColor');
      text = this.props.text.get ('text');
    } else {
      text = this.props.text;
    }

    const styleClass = this.styles.classNames.cell;

    return (
      <div
        key={this.props.index}
        className={styleClass}
        onMouseDown={this.onMouseDown}
      >
        <Label
          kind="table-cell"
          glyph={glyph}
          glyphColor={glyphColor}
          text={text}
          justify={this.props.textAlign}
        />
      </div>
    );
  }
}

/******************************************************************************/
export default TableCell;
