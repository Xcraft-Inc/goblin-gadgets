import React from 'react';
import Widget from 'laboratory/widget';

import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import Button from 'gadgets/button/widget';

class GlyphDetail extends Widget {
  constructor () {
    super (...arguments);
    this.onEdit = this.onEdit.bind (this);
  }

  static get wiring () {
    return {
      id: 'id',
      entityId: 'entityId',
    };
  }

  onEdit () {
    const contact = this.getEntityById (this.props.entityId).toJS ();
    this.do ('edit', {contact});
  }

  render () {
    const labelOf = this.getWidgetToEntityMapper (Label, 'text');
    const Title = labelOf ('.name');
    const Name = labelOf ('.name');
    const Glyph = this.getWidgetToEntityMapper (Label, 'glyph') ('.glyph');

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
              <Glyph
                glyphSize="500%"
                height="150px"
                grow="1"
                justify="center"
                insideButton="true"
              />
            </Container>
            <Container kind="row-pane" subkind="footer">
              <Button
                kind="subaction"
                text="Editer"
                width="0px"
                grow="1"
                onClick={this.onEdit}
              />
            </Container>
          </Container>
        </Container>
      </Container>
    );
  }
}

export default GlyphDetail;
