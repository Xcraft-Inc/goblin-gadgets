import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'laboratory/form';
import * as GlyphHelpers from '../helpers/glyph-helpers.js';
import * as ComboHelpers from '../helpers/combo-helpers.js';
import * as Bool from '../helpers/boolean-helpers.js';

import TextField from 'gadgets/text-field/widget';
import Button from 'gadgets/button/widget';
import Label from 'gadgets/label/widget';
import Container from 'gadgets/container/widget';
import DragCab from 'gadgets/drag-cab/widget';
import GlyphsDialog from 'gadgets/glyphs-dialog/widget';

/******************************************************************************/

class Note extends Form {
  constructor () {
    super (...arguments);

    this.state = {
      showGlyphsDialog: false,
    };

    this.glyphDialogButton = null;

    this.onSwapExtended = this.onSwapExtended.bind (this);
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

  onSwapExtended (index) {
    const x = this.props.swapExtended;
    if (x) {
      x (index);
    }
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

  renderInfoSampleGlyph (glyph, index) {
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

  renderInfoSampleGlyphs (glyphs) {
    const result = [];
    let index = 0;
    for (var glyph of glyphs) {
      result.push (this.renderInfoSampleGlyph (glyph, index++));
    }
    return result;
  }

  renderInfoButtonGlyph (glyph, dndEnable, index) {
    const g = GlyphHelpers.getGlyph (glyph.glyph);
    if (dndEnable) {
      return (
        <DragCab
          key={index}
          dragController="glyph-sample"
          direction="horizontal"
          dragOwnerId={glyph.id}
          color={this.context.theme.palette.dragAndDropHover}
          thickness="4px"
          radius="4px"
          doDragEnding={this.onGlyphDragged}
        >
          <Label
            key={index}
            width="28px"
            glyph={g.glyph}
            glyphColor={g.color}
            glyphSize="150%"
            spacing="compact"
            justify="center"
            cursor="ew-resize"
          />
        </DragCab>
      );
    } else {
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
  }

  renderInfoButtonGlyphs (glyphs) {
    const result = [];
    let index = 0;
    const dndEnable = glyphs.length > 1;
    for (var glyph of glyphs) {
      result.push (this.renderInfoButtonGlyph (glyph, dndEnable, index++));
    }
    return result;
  }

  renderInfoExtended () {
    const headerInfoClass = this.styles.classNames.headerInfo;
    const headerDragClass = this.styles.classNames.headerDrag;
    const glyphsClass = this.styles.classNames.glyphs;

    return (
      <div className={headerInfoClass}>
        <Label grow="1" />
        <div className={glyphsClass}>
          <Container kind="row">
            <Container
              kind="glyph-samples-note"
              dragController="glyph-sample"
              dragSource="glyph-samples"
              dragOwnerId="glyph-samples"
            >
              {this.renderInfoButtonGlyphs (this.props.data.glyphs)}
            </Container>
            <Button
              kind="recurrence"
              glyph="plus"
              tooltip="Ajoute un pictogramme"
              active="true"
              activeColor={
                this.showGlyphsDialog
                  ? null
                  : this.context.theme.palette.recurrenceExtendedBoxBackground
              }
              onClick={this.onOpenGlyphsDialog}
              ref={x => (this.glyphDialogButton = x)}
            />
          </Container>
        </div>
        <Button
          kind="recurrence"
          glyph="caret-up"
          tooltip="Compacte la note"
          active="true"
          activeColor={
            this.context.theme.palette.recurrenceExtendedBoxBackground
          }
          onClick={() => this.onSwapExtended (this.props.index)}
        />
      </div>
    );
  }

  renderInfoCompacted () {
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
            {this.renderInfoSampleGlyphs (this.props.data.glyphs)}
          </div>
        </div>
        <Button
          kind="recurrence"
          glyph="caret-down"
          tooltip="Etend la note pour la modifier"
          active="false"
          activeColor={
            this.context.theme.palette.recurrenceExtendedBoxBackground
          }
          onClick={() => this.onSwapExtended (this.props.index)}
        />
      </div>
    );
  }

  renderInfo (extended) {
    if (extended) {
      return this.renderInfoExtended ();
    } else {
      return this.renderInfoCompacted ();
    }
  }

  renderEditor (extended) {
    if (extended) {
      const editorClass = this.styles.classNames.editor;

      return (
        <div className={editorClass}>
          <TextField
            field="Content"
            selectAllOnFocus="true"
            hintText="Texte de la note"
            grow="1"
            spacing="large"
            rows="4"
            model=".x"
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
