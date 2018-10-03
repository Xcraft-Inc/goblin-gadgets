import React from 'react';
import Widget from 'laboratory/widget';
import Shredder from 'xcraft-core-shredder';

import Label from 'gadgets/label/widget';

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
      text = this.props.text;
    }

    const styleClass = this.styles.classNames.cell;

    return (
      <div
        key={this.props.index}
        className={styleClass}
        onMouseDown={this.onMouseDown}
        onDoubleClick={this.props.onDoubleClick}
      >
        {this.renderComponent(this.props, glyph, glyphColor, text, weight)}
      </div>
    );
  }
}

/******************************************************************************/
export default TableCell;
