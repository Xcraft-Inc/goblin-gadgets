//T:2019-02-27:Nothing to translate !
import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Shredder from 'xcraft-core-shredder';

import Label from 'goblin-gadgets/widgets/label/widget';
import * as styles from './styles';

/******************************************************************************/

export default class TreeCell extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
  }

  onMouseDown() {
    const x = this.props.selectionChanged;
    if (x) {
      x(this.props.rowId);
    }
  }

  onClick() {
    const x = this.props.onClick;
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

  renderLabel() {
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

  // Table accept a function in text, to render a specific component.
  renderFunction() {
    return (
      <div
        key={this.props.index}
        className={this.styles.classNames.cell}
        onClick={this.onClick}
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
