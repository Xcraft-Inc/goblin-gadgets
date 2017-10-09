import React from 'react';
import ReactDom from 'react-dom';
import Widget from 'laboratory/widget';
import {Unit} from 'electrum-theme';
import * as ComboHelpers from '../helpers/combo-helpers.js';
import * as Bool from '../helpers/boolean-helpers.js';

import NoteEditor from 'gadgets/note-editor/widget';
import Container from 'gadgets/container/widget';
import Button from 'gadgets/button/widget';
import Label from 'gadgets/label/widget';
import DragCab from 'gadgets/drag-cab/widget';

/******************************************************************************/

class NotesEditor extends Widget {
  constructor () {
    super (...arguments);

    this.onCreateNote = this.onCreateNote.bind (this);
    this.onSwapExtended = this.onSwapExtended.bind (this);
    this.onNoteDragged = this.onNoteDragged.bind (this);
  }

  static connectTo (instance, path) {
    return instance.getPluginToEntityMapper (
      NotesEditor,
      'notes-editor',
      'noteIds'
    ) (path || '.noteIds');
  }

  static get wiring () {
    return {
      id: 'id',
      extendedId: 'extendedId',
      noteIds: 'noteIds',
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
    const headerClass = this.props.noteIds.size === 0
      ? this.styles.classNames.headerEmpty
      : this.styles.classNames.header;

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
    const WiredNoteEditor = Widget.Wired (NoteEditor) (`note-editor@${noteId}`);

    const WiredNoteEditorWithNote = this.mapWidgetToBackend (
      WiredNoteEditor,
      note => {
        return {note: note, glyphIds: note.get ('glyphIds')};
      },
      noteId
    );

    if (extended || Bool.isTrue (this.props.readonly)) {
      return (
        <WiredNoteEditorWithNote
          key={index}
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
          dragController={this.props.id}
          direction="vertical"
          color={this.context.theme.palette.dragAndDropHover}
          thickness={this.context.theme.shapes.dragAndDropTicketThickness}
          dragOwnerId={noteId}
          doClickAction={() => this.onSwapExtended (noteId)}
          doDragEnding={this.onNoteDragged}
        >
          <WiredNoteEditorWithNote
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
    const noteIds = this.props.noteIds.toArray ();
    let index = 0;
    return noteIds.map (noteId => {
      const extended = noteId === this.props.extendedId;
      return this.renderRow (noteId, extended, index++);
    });
  }

  render () {
    if (!this.props.id || !this.props.noteIds) {
      return null;
    }

    const boxClass = this.styles.classNames.box;

    return (
      <div className={boxClass}>
        {this.renderHeader ()}
        <Container
          kind="column"
          dragController={this.props.id}
          dragSource={this.props.id}
          dragOwnerId={this.props.id}
        >
          {this.renderRows ()}
        </Container>
      </div>
    );
  }
}

/******************************************************************************/
export default NotesEditor;
