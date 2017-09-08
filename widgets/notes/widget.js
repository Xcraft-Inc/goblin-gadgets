import React from 'react';
import ReactDom from 'react-dom';
import Form from 'laboratory/form';
import {Unit} from 'electrum-theme';
import * as GlyphHelpers from '../helpers/glyph-helpers.js';
import * as ComboHelpers from '../helpers/combo-helpers.js';
import * as Bool from '../helpers/boolean-helpers.js';

import Note from 'gadgets/note/widget';
import Container from 'gadgets/container/widget';
import Button from 'gadgets/button/widget';
import Label from 'gadgets/label/widget';
import DragCab from 'gadgets/drag-cab/widget';

/******************************************************************************/

class Notes extends Form {
  constructor () {
    super (...arguments);

    this.state = {
      extendedIndex: -1,
    };

    this.onCreate = this.onCreate.bind (this);
    this.onSwapExtended = this.onSwapExtended.bind (this);
    this.onDragEnding = this.onDragEnding.bind (this);
  }

  get extendedIndex () {
    return this.state.extendedIndex;
  }

  set extendedIndex (value) {
    this.setState ({
      extendedIndex: value,
    });
  }

  onCreate () {}

  onSwapExtended (index) {
    if (index === this.extendedIndex) {
      // if panel extended ?
      index = -1; // compact the panel
    }
    this.extendedIndex = index;
  }

  onDragEnding (selectedIds, toId) {}

  /******************************************************************************/

  renderHeader () {
    const headerClass = this.styles.classNames.header;

    return (
      <div className={headerClass}>
        <Label text="Notes" grow="1" kind="title" />
        <Button
          glyph="plus"
          text="Ajouter"
          glyphPosition="right"
          onClick={this.onCreate}
        />
      </div>
    );
  }

  renderRow (note, extended, index) {
    if (extended) {
      return (
        <Note
          key={index}
          id={note.id}
          allGlyphs={this.props.allGlyphs}
          data={note}
          index={index}
          extended={Bool.toString (extended)}
          swapExtended={() => this.onSwapExtended (index)}
        />
      );
    } else {
      const dhd = Unit.add (
        this.context.theme.shapes.lineHeight,
        this.context.theme.shapes.containerMargin
      );
      return (
        <DragCab
          key={index}
          dragController="note"
          dragHeightDetect={dhd}
          direction="vertical"
          color={this.context.theme.palette.dragAndDropHover}
          thickness={this.context.theme.shapes.dragAndDropTicketThickness}
          mode="corner-top-left"
          dragOwnerId={note.id}
          doDragEnding={this.onDragEnding}
          doClickAction={() => this.onSwapExtended (index)}
        >
          <Note
            id={note.id}
            allGlyphs={this.props.allGlyphs}
            data={note}
            index={index}
            extended={Bool.toString (extended)}
            swapExtended={() => this.onSwapExtended (index)}
          />
        </DragCab>
      );
    }
  }

  renderRows () {
    const result = [];
    let index = 0;
    for (var note of this.props.data.notes) {
      const extended = this.extendedIndex === index;
      result.push (this.renderRow (note, extended, index++));
    }
    return result;
  }

  render () {
    if (!this.props.id) {
      return null;
    }

    const boxClass = this.styles.classNames.box;

    return (
      <div className={boxClass}>
        {this.renderHeader ()}
        <Container
          kind="column"
          dragController="note"
          dragSource="notes"
          dragOwnerId={this.props.data.id}
        >
          {this.renderRows ()}
        </Container>
      </div>
    );
  }
}

/******************************************************************************/
export default Notes;
