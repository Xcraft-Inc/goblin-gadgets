//T:2019-02-27
import T from 't';
import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import ComboHelpers from 'goblin-gadgets/widgets/helpers/combo-helpers';
import * as Bool from 'goblin-gadgets/widgets/helpers/bool-helpers';
import {ColorHelpers} from 'electrum-theme';
import {Unit} from 'electrum-theme';

import DialogModal from 'goblin-gadgets/widgets/dialog-modal/widget';
import Container from 'goblin-gadgets/widgets/container/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import DragCab from 'goblin-gadgets/widgets/drag-cab/widget';
import * as styles from './styles';

/******************************************************************************/

class GlyphsDialog extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.onToggleGlyph = this.onToggleGlyph.bind(this);
    this.onClearGlyphs = this.onClearGlyphs.bind(this);
    this.onDragEnding = this.onDragEnding.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  static get wiring() {
    return {
      id: 'id',
      allGlyphs: 'allGlyphs',
      selectedGlyphs: 'selectedGlyphs',
    };
  }

  onClose() {
    const x = this.props.closeDialog;
    if (x) {
      x();
    }
  }

  onToggleGlyph(glyphId) {
    this.do('toggleGlyphs', {glyphId});
    const x = this.props.glyphClicked;
    if (x) {
      x(glyphId);
    }
  }

  onClearGlyphs() {
    this.do('clearGlyphs');
    const x = this.props.clearGlyphs;
    if (x) {
      x();
    }
  }

  onDragEnding(selectedIds, toId) {
    // console.log (`GlyphsDialog.onDragEnding ${selectedIds} ${toId} ${ownerId} ${ownerKind}`);
    this.do('dragGlyphs', {fromId: selectedIds[0], toId: toId});
    const x = this.props.glyphDragged;
    if (x) {
      x(selectedIds[0], toId);
    }
  }

  renderGlyphButton(glyph, selected, index) {
    const color = ColorHelpers.getMarkColor(
      this.context.theme,
      glyph.get('color')
    );
    return (
      <Button
        key={index}
        kind="glyph-item"
        glyph={glyph.get('glyph')}
        glyphColor={color}
        text={glyph.get('name')}
        active={Bool.toString(selected)}
        onClick={() => this.onToggleGlyph(glyph.get('id'))}
      />
    );
  }

  renderGlyphButtons() {
    const allGlyphs = Widget.shred(this.props.allGlyphs);
    const selectedGlyphs = Widget.shred(this.props.selectedGlyphs);
    let index = 0;
    return allGlyphs
      .sort((a, b) => a.get('order') - b.get('order'))
      .map(glyph => {
        const id = glyph.get('id');
        const selected =
          selectedGlyphs.map(x => {
            if (x.get('id') === id) {
              return x;
            }
          }).length > 0
            ? true
            : false;
        return this.renderGlyphButton(glyph, selected ? true : false, index++);
      })
      .toArray();
  }

  renderMain() {
    const mainClass = this.styles.classNames.main;
    const glyphsClass = this.styles.classNames.glyphs;
    return (
      <div className={mainClass}>
        <Container kind="row">
          <Label text={T('Choix des pictogrammes')} grow="1" kind="title" />
          <Button
            glyph="solid/trash"
            tooltip={T('Supprime tous les pictogrammes')}
            onClick={this.onClearGlyphs}
          />
        </Container>
        <div className={glyphsClass}>{this.renderGlyphButtons()}</div>
      </div>
    );
  }

  renderGlyphSample(glyph, dndEnable, index) {
    if (dndEnable) {
      return (
        <DragCab
          key={index}
          dragController="glyph-sample"
          direction="horizontal"
          dragOwnerId={glyph.get('id')}
          color={this.context.theme.palette.dragAndDropHover}
          thickness={this.context.theme.shapes.dragAndDropTicketThickness}
          radius={this.context.theme.shapes.dragAndDropTicketThickness}
          doDragEnding={this.onDragEnding}
        >
          <Label
            key={index}
            width="70px"
            height="80px"
            glyph={glyph.get('glyph')}
            glyphColor={glyph.get('color')}
            glyphSize="300%"
            horizontalSpacing="compact"
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
          glyph={glyph.get('glyph')}
          glyphColor={glyph.get('color')}
          glyphSize="300%"
          horizontalSpacing="compact"
          justify="center"
        />
      );
    }
  }

  renderGlyphSamples() {
    const selectedGlyphs = this.shred(this.props.selectedGlyphs);
    const dndEnable = selectedGlyphs.count() > 1;
    let index = 0;
    return selectedGlyphs
      .sort((a, b) => a.get('order') - b.get('order'))
      .map(glyph => {
        return this.renderGlyphSample(glyph, dndEnable, index++);
      })
      .toArray();
  }

  render() {
    const footerClass = this.styles.classNames.footer;

    const buttonWidth = Unit.add(
      this.context.theme.shapes.glyphsDialogButtonWidth,
      this.context.theme.shapes.glyphsDialogButtonMargin
    );
    const buttonsWidth = Unit.multiply(buttonWidth, 3); // 3 columns of buttons
    const dialogWidth = Unit.add(
      Unit.add(buttonsWidth, '20px'),
      Unit.multiply(this.context.theme.shapes.floatingPadding, 2)
    ); // add scroller width

    const result = ComboHelpers.horizontalDeclipping(
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
        close={this.onClose}
      >
        {this.renderMain()}
        <div className={footerClass}>
          <Container
            kind="glyph-samples"
            dragController="glyph-sample"
            dragSource="glyph-samples"
            dragOwnerId="glyph-samples"
          >
            {this.renderGlyphSamples()}
          </Container>
          <Label grow="1" />
          <Button
            glyph="solid/check"
            text={T('Fermer', 'dialogue')}
            kind="action"
            width="150px"
            place="1/1"
            onClick={this.onClose}
          />
        </div>
      </DialogModal>
    );
  }
}

/******************************************************************************/
export default GlyphsDialog;
