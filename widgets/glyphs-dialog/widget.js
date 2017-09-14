import React from 'react';
import Widget from 'laboratory/widget';
import * as GlyphHelpers from '../helpers/glyph-helpers.js';
import * as ComboHelpers from '../helpers/combo-helpers.js';
import * as Bool from '../helpers/boolean-helpers.js';
import {ColorHelpers} from 'electrum-theme';
import {Unit} from 'electrum-theme';

import DialogModal from 'gadgets/dialog-modal/widget';
import Container from 'gadgets/container/widget';
import Button from 'gadgets/button/widget';
import Label from 'gadgets/label/widget';
import DragCab from 'gadgets/drag-cab/widget';

/******************************************************************************/

class GlyphsDialog extends Widget {
  constructor () {
    super (...arguments);
  }

  static get wiring () {
    return {
      id: 'id',
      allGlyphs: 'allGlyphs',
      selectedGlyphs: 'selectedGlyphs',
    };
  }

  onClose () {
    const x = this.props.closeDialog;
    if (x) {
      x ();
    }
  }

  onToggleGlyph (glyphId) {
    this.do ('toggleGlyphs', {glyphId});
    const x = this.props.glyphClicked;
    if (x) {
      x (glyphId);
    }
  }

  onClearGlyphs () {
    this.do ('clearGlyphs');
    const x = this.props.clearGlyphs;
    if (x) {
      x ();
    }
  }

  onDragEnding (selectedIds, toId) {
    // console.log (`GlyphsDialog.onDragEnding ${selectedIds} ${toId} ${ownerId} ${ownerKind}`);
    this.do ('dragGlyphs', {fromId: selectedIds[0], toId: toId});
    const x = this.props.glyphDragged;
    if (x) {
      x (selectedIds[0], toId);
    }
  }

  renderGlyphButton (glyph, selected, index) {
    const color = ColorHelpers.getMarkColor (
      this.context.theme,
      glyph.get ('color')
    );
    return (
      <Button
        key={index}
        kind="glyph-item"
        glyph={glyph.get ('glyph')}
        glyphColor={color}
        text={glyph.get ('name')}
        active={Bool.toString (selected)}
        onClick={() => ::this.onToggleGlyph (glyph.get ('id'))}
      />
    );
  }

  renderGlyphButtons () {
    const allGlyphs = this.shred (this.props.allGlyphs);
    const selectedGlyphs = this.shred (this.props.selectedGlyphs);
    let index = 0;
    return allGlyphs.linq
      .orderBy (glyph => glyph.get ('order'))
      .select (glyph => {
        const id = glyph.get ('id');
        const selected = selectedGlyphs.linq
          .where (x => x.get ('id') === id)
          .any ();
        return this.renderGlyphButton (glyph, selected ? true : false, index++);
      })
      .toList ();
  }

  renderMain () {
    const mainClass = this.styles.classNames.main;
    const glyphsClass = this.styles.classNames.glyphs;
    return (
      <div className={mainClass}>
        <Container kind="row">
          <Label text="Choix des pictogrammes" grow="1" kind="title" />
          <Button
            glyph="trash"
            tooltip="Supprime tous les pictogrammes"
            onClick={::this.onClearGlyphs}
          />
        </Container>
        <div className={glyphsClass}>
          {this.renderGlyphButtons ()}
        </div>
      </div>
    );
  }

  renderGlyphSample (glyph, dndEnable, index) {
    if (dndEnable) {
      return (
        <DragCab
          key={index}
          dragController="glyph-sample"
          direction="horizontal"
          dragOwnerId={glyph.get ('id')}
          color={this.context.theme.palette.dragAndDropHover}
          thickness={this.context.theme.shapes.dragAndDropTicketThickness}
          radius={this.context.theme.shapes.dragAndDropTicketThickness}
          doDragEnding={::this.onDragEnding}
        >
          <Label
            key={index}
            width="70px"
            height="80px"
            glyph={glyph.get ('glyph')}
            glyphColor={glyph.get ('color')}
            glyphSize="300%"
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
          width="70px"
          height="80px"
          glyph={glyph.get ('glyph')}
          glyphColor={glyph.get ('color')}
          glyphSize="300%"
          spacing="compact"
          justify="center"
        />
      );
    }
  }

  renderGlyphSamples () {
    const selectedGlyphs = this.shred (this.props.selectedGlyphs);
    const dndEnable = selectedGlyphs.count () > 1;
    let index = 0;
    return selectedGlyphs.linq
      .orderBy (glyph => glyph.get ('order'))
      .select (glyph => {
        return this.renderGlyphSample (glyph, dndEnable, index++);
      })
      .toList ();
  }

  render () {
    const footerClass = this.styles.classNames.footer;

    const buttonWidth = Unit.add (
      this.context.theme.shapes.glyphsDialogButtonWidth,
      this.context.theme.shapes.glyphsDialogButtonMargin
    );
    const buttonsWidth = Unit.multiply (buttonWidth, 3); // 3 columns of buttons
    const dialogWidth = Unit.add (
      Unit.add (buttonsWidth, '20px'),
      Unit.multiply (this.context.theme.shapes.floatingPadding, 2)
    ); // add scroller width

    const result = ComboHelpers.horizontalDeclipping (
      dialogWidth,
      this.props.center,
      this.context.theme.shapes.dialogDistanceFromEdge
    );

    return (
      <DialogModal
        width={dialogWidth}
        center={result.center}
        triangleShift={result.triangleShift}
        top={this.props.top}
        bottom={this.props.bottom}
        close={::this.onClose}
      >
        {this.renderMain ()}
        <div className={footerClass}>
          <Container
            kind="glyph-samples"
            dragController="glyph-sample"
            dragSource="glyph-samples"
            dragOwnerId="glyph-samples"
          >
            {this.renderGlyphSamples ()}
          </Container>
          <Label grow="1" />
          <Button
            glyph="check"
            text="Fermer"
            kind="action"
            width="150px"
            place="1/1"
            onClick={::this.onClose}
          />
        </div>
      </DialogModal>
    );
  }
}

/******************************************************************************/
export default GlyphsDialog;
