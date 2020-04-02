//T:2019-02-27

import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Shredder from 'xcraft-core-shredder';
import * as styles from './styles';
import {converters as Converters} from 'xcraft-core-converters';
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

export default class TableCell extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

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
    text = getDisplayedText(text, this.props.type, this.props.cellFormat);

    let cursor = null;
    if (this.props.isSortable) {
      cursor = 'pointer';
    }

    return (
      <div
        key={this.props.index}
        ref={node => (this.cellNode = node)}
        className={this.styles.classNames.tableCell}
        onMouseDown={this.onMouseDown}
        onDoubleClick={this.props.onDoubleClick}
      >
        <Label
          kind={
            this.props.isHeader && glyph
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
