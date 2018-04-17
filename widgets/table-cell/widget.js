import React from 'react';
import Widget from 'laboratory/widget';
import {isImmutable} from 'immutable';

import Label from 'gadgets/label/widget';

/******************************************************************************/

class TableCell extends Widget {
  constructor() {
    super(...arguments);

    this.onMouseDown = this.onMouseDown.bind(this);
  }

  onMouseDown() {
    const x = this.props.selectionChanged;
    if (x) {
      x(this.props.rowId);
    }
  }

  render() {
    let glyph = null;
    let glyphColor = null;
    let text = null;
    let weight = null;
    if (this.props.text && typeof this.props.text === 'object') {
      //- if (isImmutable(this.props.text)) {  // FIXME: Pourquoi ça ne fonctionne plus ???
      glyph = this.props.text.get('glyph');
      glyphColor = this.props.text.get('glyphColor');
      text = this.props.text.get('text');
      weight = this.props.text.get('weight');
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
          weight={weight}
          justify={this.props.textAlign}
          wrap={this.props.wrap}
        />
      </div>
    );
  }
}

/******************************************************************************/
export default TableCell;
