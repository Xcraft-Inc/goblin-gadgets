import React from 'react';
import Widget from 'laboratory/widget';
import {Unit} from 'electrum-theme';

import Recurrence from 'gadgets/recurrence/widget';
import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import Button from 'gadgets/button/widget';
import DragCab from 'gadgets/drag-cab/widget';

/******************************************************************************/

class Recurrences extends Widget {
  constructor (props) {
    super (props);
  }

  onCreateRecurrence () {
    this.do ('add');
  }

  onDeleteRecurrence (recurrence) {
    this.do ('remove', {recurrence});
  }

  onSwapExtended (index) {
    if (index === this.extendedIndex) {
      // if panel extended ?
      index = -1; // compact the panel
    }
    this.extendedIndex = index;
    this.forceUpdate ();
  }

  onDragEnding (selectedIds, toId) {
    this.do ('drag', {fromId: selectedIds[0], toId: toId});
  }

  renderHeader () {
    const headerClass = this.styles.classNames.header;
    return (
      <div className={headerClass}>
        <Label text="Récurrences" grow="1" kind="title" />
        <Button
          glyph="plus"
          text="Ajouter"
          glyphPosition="right"
          onClick={::this.onCreateRecurrence}
        />
      </div>
    );
  }

  renderRow (recurrence, extended, index) {
    const dhd = Unit.add (
      this.context.theme.shapes.lineHeight,
      this.context.theme.shapes.containerMargin
    );
    return (
      <DragCab
        dragController="recurrence"
        dragHeightDetect={dhd}
        direction="vertical"
        color={this.context.theme.palette.dragAndDropHover}
        thickness={this.context.theme.shapes.dragAndDropTicketThickness}
        mode="corner-top-left"
        dragOwnerId={recurrence.id}
        doClickAction={() => ::this.onSwapExtended (index)}
        doDragEnding={::this.onDragEnding}
      >
        <Recurrence
          index={index}
          field={index}
          value={recurrence}
          extended={extended ? 'true' : 'false'}
          onDeleteRecurrence={() => ::this.onDeleteRecurrence (recurrence)}
        />
      </DragCab>
    );
  }

  renderRows () {
    const recurrences = this.shred (this.props.recurrences);
    let index = 0;
    return recurrences.linq
      .orderBy (recurrence => recurrence.get ('order'))
      .select (recurrence => {
        const extended = this.extendedIndex === index;
        return this.renderRow (recurrence, extended, index++);
      })
      .toList ();
  }

  render () {
    const boxClass = this.styles.classNames.box;
    return (
      <div className={boxClass}>
        {this.renderHeader ()}
        <Container
          kind="column"
          dragController="recurrence"
          dragSource="recurrences"
          dragOwnerId="FIXME:xyz"
        >
          {this.renderRows ()}
        </Container>
      </div>
    );
  }
}

/******************************************************************************/
export default Recurrences;
