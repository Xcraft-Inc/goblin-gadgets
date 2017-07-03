import React from 'react';
import Widget from 'laboratory/widget';
import * as GlyphHelpers from '../helpers/glyph-helpers.js';
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

  onClose () {
    const x = this.props['close-dialog'];
    if (x) {
      x ();
    }
  }

  onToggleGlyph (glyph) {
    // console.log ('GlyphsDialog.onToggleGlyph');
    const x = this.props['glyph-clicked'];
    if (x) {
      x (glyph);
    }
  }

  onClearGlyphs () {
    const x = this.props['clear-glyphs'];
    if (x) {
      x ();
    }
  }

  onDragEnding (selectedIds, toId) {
    // console.log (`GlyphsDialog.onDragEnding ${selectedIds} ${toId} ${ownerId} ${ownerKind}`);
    const x = this.props['glyph-dragged'];
    if (x) {
      x (selectedIds[0], toId);
    }
  }

  renderGlyphButton (glyph, selected) {
    const g = GlyphHelpers.getGlyph (glyph.Glyph);
    const color = ColorHelpers.getMarkColor (this.context.theme, g.color);
    return (
      <Button
        kind="glyph-item"
        glyph={g.glyph}
        glyph-color={color}
        text={glyph.Name}
        active={selected ? 'true' : 'false'}
        onClick={() => ::this.onToggleGlyph (glyph)}
      />
    );
  }

  renderGlyphButtons () {
    const allGlyphs = this.props['all-glyphs'];
    const selectedGlyphs = this.props['selected-glyphs'];
    const result = [];
    for (var glyph of allGlyphs.glyphs) {
      const selected = Enumerable.from (selectedGlyphs)
        .where (x => x.id === glyph.id)
        .any ();
      result.push (this.renderGlyphButton (glyph, selected));
    }
    return result;
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
    const g = GlyphHelpers.getGlyph (glyph.Glyph);
    if (dndEnable) {
      return (
        <DragCab
          drag-controller="glyph-sample"
          direction="horizontal"
          drag-owner-id={glyph.id}
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
    const selectedGlyphs = this.props['selected-glyphs'];
    const result = [];
    let index = 0;
    const dndEnable = selectedGlyphs.length > 1;
    for (var glyph of selectedGlyphs) {
      result.push (this.renderGlyphSample (glyph, dndEnable, index++));
    }
    return result;
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

    return (
      <DialogModal
        width={dialogWidth}
        center={center}
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
