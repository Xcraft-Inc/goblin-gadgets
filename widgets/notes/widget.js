import React from 'react';
import ReactDom from 'react-dom';
import Widget from 'laboratory/widget';
import {Unit} from 'electrum-theme';
import * as ComboHelpers from '../helpers/combo-helpers.js';
import * as Bool from '../helpers/boolean-helpers.js';

import Note from 'gadgets/note/widget';
import Container from 'gadgets/container/widget';
import Button from 'gadgets/button/widget';
import Label from 'gadgets/label/widget';
import DragCab from 'gadgets/drag-cab/widget';

/******************************************************************************/

class Notes extends Widget {
  constructor () {
    super (...arguments);

    this.onCreateNote = this.onCreateNote.bind (this);
    this.onSwapExtended = this.onSwapExtended.bind (this);
    this.onNoteDragged = this.onNoteDragged.bind (this);
  }

  static get wiring () {
    return {
      id: 'id',
      notes: 'notes',
      extendedId: 'extendedId',
    };
  }

  onCreateNote () {
    this.do ('add');
  }

  onSwapExtended (noteId) {
    this.do ('extend', {noteId});
  }

  onDeleteNote (noteId) {
    this.do ('remove', {noteId});
  }

  onNoteDragged (selectedIds, toId) {
    this.do ('drag', {fromId: selectedIds[0], toId: toId});
  }

  /******************************************************************************/

  renderHeader () {
    const headerClass = this.styles.classNames.header;

    if (Bool.isTrue (this.props.readonly)) {
      return (
        <div className={headerClass}>
          <Label text="Notes" grow="1" kind="title" />
        </div>
      );
    } else {
      return (
        <div className={headerClass}>
          <Label text="Notes" grow="1" kind="title" />
          <Button
            glyph="plus"
            text="Ajouter"
            glyphPosition="right"
            onClick={this.onCreateNote}
          />
        </div>
      );
    }
  }

  renderRow (noteId, extended, index) {
    const WiredNote = Widget.Wired (Note) (noteId);
    if (extended || Bool.isTrue (this.props.readonly)) {
      return (
        <WiredNote
          key={index}
          allGlyphs={this.props.allGlyphs}
          readonly={Bool.toString (this.props.readonly)}
          extended={Bool.toString (extended)}
          swapExtended={() => this.onSwapExtended (noteId)}
          deleteNote={() => this.onDeleteNote (noteId)}
        />
      );
    } else {
      return (
        <DragCab
          key={index}
          dragController="note"
          direction="vertical"
          color={this.context.theme.palette.dragAndDropHover}
          thickness={this.context.theme.shapes.dragAndDropTicketThickness}
          dragOwnerId={noteId}
          doClickAction={() => this.onSwapExtended (noteId)}
          doDragEnding={this.onNoteDragged}
        >
          <WiredNote
            allGlyphs={this.props.allGlyphs}
            readonly={Bool.toString (this.props.readonly)}
            extended={Bool.toString (extended)}
            swapExtended={() => this.onSwapExtended (noteId)}
            deleteNote={() => this.onDeleteNote (noteId)}
          />
        </DragCab>
      );
    }
  }

  renderRows () {
    const notes = this.shred (this.props.notes);
    let index = 0;
    return notes.linq
      .orderBy (note => note.get ('order'))
      .select (note => {
        const id = note.get ('id');
        const extended = id === this.props.extendedId;
        return this.renderRow (id, extended, index++);
      })
      .toList ();
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
          dragOwnerId={this.props.id}
        >
          {this.renderRows ()}
        </Container>
      </div>
    );
  }
}

/******************************************************************************/
export default Notes;
