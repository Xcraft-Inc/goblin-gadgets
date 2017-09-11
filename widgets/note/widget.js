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
import Combo from 'gadgets/combo/widget';

/******************************************************************************/

class Note extends Form {
  constructor () {
    super (...arguments);

    this.state = {
      showCombo: false,
    };

    this.glyphDialogButton = null;

    this.onSwapExtended = this.onSwapExtended.bind (this);
    this.onDeleteNote = this.onDeleteNote.bind (this);
    this.onClearGlyphs = this.onClearGlyphs.bind (this);
    this.onAddGlyph = this.onAddGlyph.bind (this);
    this.onGlyphDragged = this.onGlyphDragged.bind (this);
    this.onOpenCombo = this.onOpenCombo.bind (this);
    this.onCloseCombo = this.onCloseCombo.bind (this);
  }

  static get wiring () {
    return {
      id: 'id',
      order: 'order',
      content: 'content',
      glyphs: 'glyphs',
    };
  }

  get showCombo () {
    return this.state.showCombo;
  }

  set showCombo (value) {
    this.setState ({
      showCombo: value,
    });
  }

  onSwapExtended (noteId) {
    const x = this.props.swapExtended;
    if (x) {
      x (noteId);
    }
  }

  onDeleteNote () {}

  onClearGlyphs () {}

  onAddGlyph (glyphId) {
    const glyph = this.props.allGlyphs[glyphId];
    this.do ('add', {glyph});
  }

  onGlyphDragged (selectedIds, toId) {
    this.do ('drag', {fromId: selectedIds[0], toId: toId});
  }

  onOpenCombo () {
    const node = ReactDOM.findDOMNode (this.glyphDialogButton);
    const itemCount = this.glyphsList.length;
    this.comboLocation = ComboHelpers.getComboLocation (
      node,
      this.context.theme.shapes.flyingBalloonTriangleSize,
      this.context.theme.shapes.flyingBalloonPadding,
      itemCount,
      '300px',
      this.context.theme.shapes.menuButtonHeight // height of Button kind='combo-wrap-item'
    );
    this.showCombo = true;
  }

  onCloseCombo () {
    this.showCombo = false;
  }

  get glyphsList () {
    const glyphIds = this.shred (this.props.glyphs)
      .linq.select (glyph => glyph.get ('id'))
      .toArray ();

    const list = [];
    const allGlyphs = this.shred (this.props.allGlyphs);
    let index = 0;
    allGlyphs.linq
      .orderBy (glyph => glyph.get ('order'))
      .where (glyph => {
        const id = glyph.get ('id');
        return glyphIds.indexOf (id) === -1;
      })
      .select (glyph => {
        list.push ({
          text: glyph.get ('description'),
          glyph: glyph.get ('glyph'),
          action: () => this.onAddGlyph (glyph.get ('id')),
        });
      });
    return list;
  }

  /******************************************************************************/

  renderCombo () {
    if (this.showCombo) {
      return (
        <Combo
          menuType="combo"
          menuItemWidth={this.comboLocation.menuItemWidth}
          center={this.comboLocation.center}
          top={this.comboLocation.top}
          bottom={this.comboLocation.bottom}
          maxHeight={this.comboLocation.maxHeight}
          width={this.comboLocation.width}
          list={this.glyphsList}
          close={::this.onCloseCombo}
        />
      );
    } else {
      return null;
    }
  }

  renderInfoSampleGlyph (glyph, index) {
    const g = GlyphHelpers.getGlyph (glyph.get ('glyph'));
    return (
      <Label
        key={index}
        width="28px"
        glyph={g.glyph}
        glyphColor={g.color}
        glyphSize="150%"
        spacing="compact"
        justify="center"
        cursor="ns-resize"
      />
    );
  }

  renderInfoSampleGlyphs () {
    const glyphs = this.shred (this.props.glyphs);
    let index = 0;
    return glyphs.linq
      .orderBy (glyph => glyph.get ('order'))
      .select (glyph => {
        const id = glyph.get ('id');
        return this.renderInfoSampleGlyph (glyph, index++);
      })
      .toList ();
  }

  renderInfoButtonGlyph (glyph, index) {
    const g = GlyphHelpers.getGlyph (glyph.get ('glyph'));
    return (
      <DragCab
        key={index}
        dragController="glyph-sample-note"
        direction="horizontal"
        dragOwnerId={glyph.get ('id')}
        dragToDelete="true"
        color={this.context.theme.palette.dragAndDropHover}
        thickness="4px"
        radius="4px"
        doDragEnding={this.onGlyphDragged}
      >
        <Label
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
  }

  renderInfoButtonGlyphs () {
    const glyphs = this.shred (this.props.glyphs);
    let index = 0;
    return glyphs.linq
      .orderBy (glyph => glyph.get ('order'))
      .select (glyph => {
        const id = glyph.get ('id');
        return this.renderInfoButtonGlyph (glyph, index++);
      })
      .toList ();
  }

  renderInfoExtended () {
    const headerInfoClass = this.styles.classNames.headerInfo;
    const headerDragClass = this.styles.classNames.headerDrag;
    const glyphsClass = this.styles.classNames.glyphsExtended;

    return (
      <div className={headerInfoClass}>
        <Label grow="1" />
        <div className={glyphsClass}>
          <Container kind="row">
            <Container
              kind="glyph-samples-note"
              dragController="glyph-sample-note"
              dragSource="glyph-samples-note"
              dragOwnerId="glyph-samples-note"
            >
              {this.renderInfoButtonGlyphs ()}
            </Container>
            <Button
              kind="recurrence"
              glyph="plus"
              tooltip="Ajoute un pictogramme"
              active="true"
              activeColor={
                this.showCombo
                  ? null
                  : this.context.theme.palette.recurrenceExtendedBoxBackground
              }
              onClick={this.onOpenCombo}
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
          onClick={() => this.onSwapExtended (this.props.id)}
        />
      </div>
    );
  }

  renderInfoCompacted () {
    const headerInfoClass = this.styles.classNames.headerInfo;
    const headerDragClass = this.styles.classNames.headerDrag;
    const glyphsClass = this.styles.classNames.glyphsCompacted;

    return (
      <div className={headerInfoClass}>
        <div className={headerDragClass}>
          <Label
            text={this.props.content}
            wrap="no"
            singleLine="true"
            grow="1"
            cursor="ns-resize"
          />
          <div className={glyphsClass}>
            {this.renderInfoSampleGlyphs ()}
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
          onClick={() => this.onSwapExtended (this.props.id)}
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
            model=".content"
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

    const Form = this.Form;

    return (
      <div className={mainClass}>
        <Form {...this.formConfig}>
          {this.renderInfo (extended)}
          {this.renderEditor (extended)}
          {this.renderCombo ()}
        </Form>
      </div>
    );
  }
}

/******************************************************************************/
export default Note;
