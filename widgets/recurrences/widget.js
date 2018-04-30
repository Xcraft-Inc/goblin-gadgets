import React from 'react';
import Widget from 'laboratory/widget';
import {Unit} from 'electrum-theme';
const Bool = require('gadgets/helpers/bool-helpers');

import Recurrence from 'gadgets/recurrence/widget';
import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import Button from 'gadgets/button/widget';
import DragCab from 'gadgets/drag-cab/widget';

/******************************************************************************/

class Recurrences extends Widget {
  constructor() {
    super(...arguments);

    this.onSwapExtended = this.onSwapExtended.bind(this);
    this.onDeleteRecurrence = this.onSwapExtended.bind(this);
    this.onDragEnding = this.onDragEnding.bind(this);
  }

  static get wiring() {
    return {
      id: 'id',
      recurrences: 'recurrences',
      extendedId: 'extendedId',
    };
  }

  onCreateRecurrence() {
    this.do('add');
  }

  onDeleteRecurrence(recurrenceId) {
    this.do('remove', {recurrenceId});
  }

  onSwapExtended(recurrenceId) {
    this.do('extend', {recurrenceId});
  }

  onDragEnding(selectedIds, toId) {
    this.do('drag', {fromId: selectedIds[0], toId: toId});
  }

  renderHeader() {
    const headerClass = this.styles.classNames.header;

    if (Bool.isTrue(this.props.readonly)) {
      return (
        <div className={headerClass}>
          <Label text="Récurrences" grow="1" kind="title" />
        </div>
      );
    } else {
      return (
        <div className={headerClass}>
          <Label text="Récurrences" grow="1" kind="title" />
          <Button
            glyph="solid/plus"
            text="Ajouter"
            glyphPosition="right"
            onClick={this.onCreateNote}
          />
        </div>
      );
    }
  }

  renderRow(recurrenceId, extended, index) {
    const WiredRecurrence = Widget.Wired(Recurrence)(recurrenceId);
    if (Bool.isTrue(this.props.readonly)) {
      return (
        <WiredRecurrence
          key={index}
          extended={Bool.toString(extended)}
          readonly={Bool.toString(this.props.readonly)}
          swapExtended={() => this.onSwapExtended(recurrenceId)}
          deleteRecurrence={() => this.onDeleteRecurrence(recurrenceId)}
        />
      );
    } else {
      const dhd = Unit.add(
        this.context.theme.shapes.lineHeight,
        this.context.theme.shapes.containerMargin
      );
      return (
        <DragCab
          key={index}
          dragController="recurrence"
          dragHeightDetect={dhd}
          direction="vertical"
          color={this.context.theme.palette.dragAndDropHover}
          thickness={this.context.theme.shapes.dragAndDropTicketThickness}
          dragOwnerId={recurrenceId}
          doClickAction={() => this.onSwapExtended(recurrenceId)}
          doDragEnding={this.onDragEnding}
        >
          <WiredRecurrence
            extended={Bool.toString(extended)}
            readonly={Bool.toString(this.props.readonly)}
            swapExtended={() => this.onSwapExtended(recurrenceId)}
            deleteRecurrence={() => this.onDeleteRecurrence(recurrenceId)}
          />
        </DragCab>
      );
    }
  }

  renderRows() {
    const recurrences = Widget.shred(this.props.recurrences);
    let index = 0;
    return recurrences.linq
      .orderBy(recurrence => recurrence.get('order'))
      .select(recurrence => {
        const id = recurrence.get('id');
        const extended = id === this.props.extendedId;
        return this.renderRow(id, extended, index++);
      })
      .toList();
  }

  render() {
    if (!this.props.id) {
      return null;
    }

    const boxClass = this.styles.classNames.box;

    return (
      <div className={boxClass}>
        {this.renderHeader()}
        <Container
          kind="column"
          dragController="recurrence"
          dragSource="recurrences"
          dragOwnerId={this.props.id}
        >
          {this.renderRows()}
        </Container>
      </div>
    );
  }
}

/******************************************************************************/
export default Recurrences;
