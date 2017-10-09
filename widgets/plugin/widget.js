import React from 'react';
import Widget from 'laboratory/widget';
import * as Bool from '../helpers/boolean-helpers.js';

import Container from 'gadgets/container/widget';
import Button from 'gadgets/button/widget';
import Label from 'gadgets/label/widget';
import DragCab from 'gadgets/drag-cab/widget';

import importer from 'laboratory/importer/';
const widgetImporter = importer ('widget');
/******************************************************************************/

class Plugin extends Widget {
  constructor () {
    super (...arguments);

    this.onCreateEntity = this.onCreateEntity.bind (this);
    this.onSwapExtended = this.onSwapExtended.bind (this);
    this.onEntityDragged = this.onEntityDragged.bind (this);
  }

  static createFor (name, instance) {
    return instance.getPluginToEntityMapper (Plugin, name, 'entityIds') (
      '.entityIds'
    );
  }

  static get wiring () {
    return {
      id: 'id',
      title: 'title',
      extendedId: 'extendedId',
      entityIds: 'entityIds',
      editorWidget: 'editorWidget',
    };
  }

  onCreateEntity () {
    const service = this.props.id.split ('@')[0];
    this.doAs (service, 'add');
  }

  onSwapExtended (entityId) {
    const service = this.props.id.split ('@')[0];
    this.doAs (service, 'extend', {entityId});
  }

  onDeleteEntity (entityId) {
    const service = this.props.id.split ('@')[0];
    this.doAs (service, 'remove', {entityId});
  }

  onEntityDragged (selectedIds, toId) {
    const service = this.props.id.split ('@')[0];
    this.doAs (service, 'drag', {
      fromId: selectedIds[0],
      toId: toId,
    });
  }

  /******************************************************************************/

  renderHeader () {
    const headerClass = this.props.entityIds.size === 0
      ? this.styles.classNames.headerEmpty
      : this.styles.classNames.header;

    if (Bool.isTrue (this.props.readonly)) {
      return (
        <div className={headerClass}>
          <Label text={this.props.title} grow="1" kind="title" />
        </div>
      );
    } else {
      return (
        <div className={headerClass}>
          <Label text={this.props.title} grow="1" kind="title" />
          <Button
            glyph="plus"
            text="Ajouter"
            glyphPosition="right"
            onClick={this.onCreateEntity}
          />
        </div>
      );
    }
  }

  renderRow (entityId, extended, index) {
    const EditorWidget = widgetImporter (this.props.editorWidget);
    const WiredEntityEditor = Widget.Wired (EditorWidget) (
      `${this.props.editorWidget}@${entityId}`
    );

    const WiredEntityEditorWithEntity = this.mapWidgetToBackend (
      WiredEntityEditor,
      entity => {
        return {entity: entity};
      },
      entityId
    );

    if (extended || Bool.isTrue (this.props.readonly)) {
      return (
        <WiredEntityEditorWithEntity
          key={index}
          readonly={Bool.toString (this.props.readonly)}
          extended={Bool.toString (extended)}
          swapExtended={() => this.onSwapExtended (entityId)}
          deleteEntity={() => this.onDeleteEntity (entityId)}
        />
      );
    } else {
      return (
        <DragCab
          key={index}
          dragController={this.props.id}
          direction="vertical"
          color={this.context.theme.palette.dragAndDropHover}
          thickness={this.context.theme.shapes.dragAndDropTicketThickness}
          dragOwnerId={entityId}
          doClickAction={() => this.onSwapExtended (entityId)}
          doDragEnding={this.onNoteDragged}
        >
          <WiredEntityEditorWithEntity
            readonly={Bool.toString (this.props.readonly)}
            extended={Bool.toString (extended)}
            swapExtended={() => this.onSwapExtended (entityId)}
            deleteEntity={() => this.onDeleteEntity (entityId)}
          />
        </DragCab>
      );
    }
  }

  renderRows () {
    const entityIds = this.props.entityIds.toArray ();
    let index = 0;
    return entityIds.map (entityId => {
      const extended = entityId === this.props.extendedId;
      return this.renderRow (entityId, extended, index++);
    });
  }

  render () {
    if (!this.props.id || !this.props.entityIds) {
      return null;
    }

    if (!this.props.editorWidget) {
      return <div>No editor provided in props!</div>;
    }

    const boxClass = this.styles.classNames.box;

    return (
      <div className={boxClass}>
        {this.renderHeader ()}
        <Container
          kind="column"
          dragController={this.props.id}
          dragSource={this.props.id}
          dragOwnerId={this.props.id}
        >
          {this.renderRows ()}
        </Container>
      </div>
    );
  }
}

/******************************************************************************/
export default Plugin;
