import React from 'react';
import Widget from 'laboratory/widget';
import * as GlyphHelpers from '../helpers/glyph-helpers.js';
import * as ComboHelpers from '../helpers/combo-helpers.js';
import {ColorHelpers} from 'electrum-theme';
import {Unit} from 'electrum-theme';
import Enumerable from 'linq';

import DialogModal from 'gadgets/dialog-modal/widget';
import Container from 'gadgets/container/widget';
import Button from 'gadgets/button/widget';
import Label from 'gadgets/label/widget';
import DragCab from 'gadgets/drag-cab/widget';
import DragCapsule from 'gadgets/drag-capsule/widget';

/******************************************************************************/

class GlyphsDialog extends Widget {
  constructor (props) {
    super (props);
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
      x (glyph);
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
    const g = GlyphHelpers.getGlyph (glyph.get ('glyph'));
    const color = ColorHelpers.getMarkColor (this.context.theme, g.color);
    return (
      <Button
        key={index}
        kind="glyph-item"
        glyph={g.glyph}
        glyph-color={color}
        text={glyph.get ('name')}
        active={selected ? 'true' : 'false'}
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
    const g = GlyphHelpers.getGlyph (glyph.get ('glyph'));
    if (dndEnable) {
      return (
        <DragCab
          key={index}
          drag-controller="glyph-sample"
          direction="horizontal"
          drag-owner-id={glyph.get ('id')}
          color={this.context.theme.palette.dragAndDropHover}
          thickness={this.context.theme.shapes.dragAndDropTicketThickness}
          radius={this.context.theme.shapes.dragAndDropTicketThickness}
          do-drag-ending={::this.onDragEnding}
        >
          <DragCapsule
            component="Label"
            width="70px"
            height="80px"
            index={index}
            glyph={g.glyph}
            glyph-color={g.color}
            glyph-size="300%"
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
          index={index}
          glyph={g.glyph}
          glyph-color={g.color}
          glyph-size="300%"
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
    const center = this.props.center;
    const top = this.props.top;
    const bottom = this.props.bottom;

    const footerClass = this.styles.classNames.footer;

    const buttonWidth = Unit.add (
      this.context.theme.shapes.glyphsDialogButtonWidth,
      this.context.theme.shapes.glyphsDialogButtonMargin
    );
    const buttonsWidth = Unit.multiply (buttonWidth, 3); // 3 columns of buttons
    const dialogWidth = Unit.add (buttonsWidth, '20px'); // add scroller width

    const result = ComboHelpers.declipping (
      dialogWidth,
      center,
      this.context.theme.shapes.floatingPadding
    );

    return (
      <DialogModal
        width={dialogWidth}
        center={result.center}
        shift={result.shift}
        top={top}
        bottom={bottom}
        close={::this.onClose}
      >
        {this.renderMain ()}
        <div className={footerClass}>
          <Container
            kind="glyph-samples"
            drag-controller="glyph-sample"
            drag-source="glyph-samples"
            drag-owner-id="glyph-samples"
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
