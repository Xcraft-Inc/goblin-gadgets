import React from 'react';
import Widget from 'laboratory/widget';

import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import Button from 'gadgets/button/widget';

/******************************************************************************/

class GlyphDetail extends Widget {
  constructor() {
    super(...arguments);

    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  static get wiring() {
    return {
      id: 'id',
      entityId: 'entityId',
    };
  }

  onEdit() {
    const contact = this.getEntityById(this.props.entityId).toJS();
    this.do('edit', {contact});
  }

  onDelete() {
    const contact = this.getEntityById(this.props.entityId).toJS();
    this.do('delete', {contact});
  }

  /******************************************************************************/

  renderActions() {
    return (
      <Container kind="actions">
        <Button
          width="0px"
          grow="1"
          kind="action"
          glyph="solid/pencil"
          text="Editer"
          place="1/2"
          onClick={this.onEdit}
        />
        <Button
          width="0px"
          grow="0.5"
          kind="action"
          glyph="solid/trash"
          text="Supprimer"
          place="2/2"
          onClick={this.onDelete}
        />
      </Container>
    );
  }

  render() {
    const labelOf = this.getWidgetToEntityMapper(Label, 'text');
    const Title = labelOf('.name');
    const Name = labelOf('.name');
    const Description = labelOf('.description');
    const Glyph = this.getWidgetToEntityMapper(Label, glyph => {
      return {
        glyph: glyph.get('glyph'),
        glyphColor: glyph.get('color'),
      };
    })('');

    return (
      <Container kind="column-full">
        <Container kind="pane-header">
          <Title kind="pane-header" />
        </Container>
        <Container kind="panes">
          <Container kind="pane">
            <Container kind="row-pane">
              <Label text="Pictogramme" kind="title" />
            </Container>
            <Container kind="row-pane">
              <Name />
            </Container>
            <Container kind="row-pane">
              <Description />
            </Container>
            <Container kind="row-pane">
              <Glyph
                glyphSize="1000%"
                height="300px"
                grow="1"
                justify="center"
                insideButton="true"
              />
            </Container>
          </Container>
        </Container>
        {this.renderActions()}
      </Container>
    );
  }
}

/******************************************************************************/
export default GlyphDetail;
