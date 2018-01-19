import React from 'react';
import Widget from 'laboratory/widget';

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
    if (!this.props.text || typeof this.props.text === 'string') {
      text = this.props.text;
    } else {
      glyph = this.props.text.get ('glyph');
      glyphColor = this.props.text.get ('glyphColor');
      text = this.props.text.get ('text');
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
        />
      </div>
    );
  }
}

/******************************************************************************/
export default TableCell;
