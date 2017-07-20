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
  constructor () {
    super (...arguments);
  }

  static get wiring () {
    return {
      id: 'id',
      recurrences: 'recurrences',
      extendedId: 'extendedId',
    };
  }

  onCreateRecurrence () {
    this.do ('add');
  }

  onDeleteRecurrence (recurrenceId) {
    this.do ('remove', {recurrenceId});
  }

  onSwapExtended (recurrenceId) {
    this.do ('extend', {recurrenceId});
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

  renderRow (recurrenceId, extended, index) {
    const dhd = Unit.add (
      this.context.theme.shapes.lineHeight,
      this.context.theme.shapes.containerMargin
    );
    const WiredRecurrence = Widget.Wired (Recurrence) (recurrenceId);
    return (
      <DragCab
        key={index}
        dragController="recurrence"
        dragHeightDetect={dhd}
        direction="vertical"
        color={this.context.theme.palette.dragAndDropHover}
        thickness={this.context.theme.shapes.dragAndDropTicketThickness}
        mode="corner-top-left"
        dragOwnerId={recurrenceId}
        doClickAction={() => ::this.onSwapExtended (recurrenceId)}
        doDragEnding={::this.onDragEnding}
      >
        <WiredRecurrence
          extended={extended ? 'true' : 'false'}
          onDeleteRecurrence={() => ::this.onDeleteRecurrence (recurrenceId)}
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
        const id = recurrence.get ('id');
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
          dragController="recurrence"
          dragSource="recurrences"
          dragOwnerId={this.props.id}
        >
          {this.renderRows ()}
        </Container>
      </div>
    );
  }
}

/******************************************************************************/
export default Recurrences;
