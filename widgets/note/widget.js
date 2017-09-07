import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'laboratory/form';
import * as GlyphHelpers from '../helpers/glyph-helpers.js';
import * as ComboHelpers from '../helpers/combo-helpers.js';
import * as Bool from '../helpers/boolean-helpers.js';

import LabelTextField from 'gadgets/label-text-field/widget';
import Button from 'gadgets/button/widget';
import Label from 'gadgets/label/widget';
import GlyphsDialog from 'gadgets/glyphs-dialog/widget';

/******************************************************************************/

class Note extends Form {
  constructor () {
    super (...arguments);

    this.state = {
      showGlyphsDialog: false,
    };

    this.glyphDialogButton = null;

    this.onDeleteNote = this.onDeleteNote.bind (this);
    this.onGlyphClicked = this.onGlyphClicked.bind (this);
    this.onClearGlyphs = this.onClearGlyphs.bind (this);
    this.onGlyphDragged = this.onGlyphDragged.bind (this);
    this.onOpenGlyphsDialog = this.onOpenGlyphsDialog.bind (this);
    this.onCloseGlyphsDialog = this.onCloseGlyphsDialog.bind (this);
  }

  get showGlyphsDialog () {
    return this.state.showGlyphsDialog;
  }

  set showGlyphsDialog (value) {
    this.setState ({
      showGlyphsDialog: value,
    });
  }

  onDeleteNote () {}

  onGlyphClicked (glyph) {}

  onClearGlyphs () {}

  onGlyphDragged (selectedId, toId) {}

  onOpenGlyphsDialog () {
    const node = ReactDOM.findDOMNode (this.glyphDialogButton);
    this.comboLocation = ComboHelpers.getComboLocation (
      node,
      this.context.theme.shapes.flyingDialogTriangleSize
    );
    this.showGlyphsDialog = true;
  }

  onCloseGlyphsDialog () {
    this.showGlyphsDialog = false;
  }

  /******************************************************************************/

  renderGlyphsDialog () {
    if (this.showGlyphsDialog) {
      return (
        <GlyphsDialog
          center={this.comboLocation.center}
          top={this.comboLocation.top}
          bottom={this.comboLocation.bottom}
          allGlyphs={this.props.allGlyphs}
          selectedGlyphs={this.props.data.glyphs}
          glyphClicked={this.onGlyphClicked}
          clearGlyphs={this.onClearGlyphs}
          glyphDragged={this.onGlyphDragged}
          closeDialog={this.onCloseGlyphsDialog}
        />
      );
    } else {
      return null;
    }
  }

  renderInfoGlyph (glyph, index) {
    const g = GlyphHelpers.getGlyph (glyph.glyph);
    return (
      <Label
        key={index}
        width="28px"
        glyph={g.glyph}
        glyphColor={g.color}
        glyphSize="150%"
        spacing="compact"
        justify="center"
      />
    );
  }

  renderInfoGlyphs (glyphs) {
    const result = [];
    let index = 0;
    for (var glyph of glyphs) {
      result.push (this.renderInfoGlyph (glyph, index++));
    }
    return result;
  }

  renderInfo (extended) {
    const headerInfoClass = this.styles.classNames.headerInfo;
    const headerDragClass = this.styles.classNames.headerDrag;
    const glyphsClass = this.styles.classNames.glyphs;

    return (
      <div className={headerInfoClass}>
        <div className={headerDragClass}>
          <Label
            text={this.props.data.content}
            wrap="no"
            singleLine="true"
            grow="1"
          />
          <div className={glyphsClass}>
            {this.renderInfoGlyphs (this.props.data.glyphs)}
          </div>
        </div>
        <Button
          kind="recurrence"
          glyph={extended ? 'caret-up' : 'caret-down'}
          tooltip={
            extended ? 'Compacte la note' : 'Etend la note pour la modifier'
          }
          active={extended ? 'true' : 'false'}
          activeColor={
            this.context.theme.palette.recurrenceExtendedBoxBackground
          }
        />
      </div>
    );
  }

  renderEditor (extended) {
    if (extended) {
      const editorClass = this.styles.classNames.editor;

      return (
        <div className={editorClass}>
          <LabelTextField
            field="Content"
            selectAllOnFocus="true"
            hintText="Texte de la note"
            labelGlyph="comment-o"
            grow="1"
            spacing="large"
            rows="4"
            model=".x"
          />
          <Button
            height="auto"
            kind="combo"
            glyph="pencil"
            tooltip="Choix des pictogrammes"
            active={this.showGlyphsDialog ? 'true' : 'false'}
            onClick={this.onOpenGlyphsDialog}
            spacing="large"
            ref={x => (this.glyphDialogButton = x)}
          />
          <Button
            glyph="trash"
            tooltip="Supprime la note"
            onClick={this.onDeleteNote}
          />
        </div>
      );
    } else {
      return null;
    }
  }

  render () {
    if (!this.props.id) {
      return null;
    }

    const mainClass = this.styles.classNames.main;
    const extended = Bool.isTrue (this.props.extended);

    return (
      <div className={mainClass}>
        {this.renderInfo (extended)}
        {this.renderEditor (extended)}
        {this.renderGlyphsDialog ()}
      </div>
    );
  }
}

/******************************************************************************/
export default Note;
