import React from 'react';
import Widget from 'laboratory/widget';
import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';

class GlyphDetail extends Widget {
  constructor () {
    super (...arguments);
  }

  static get wiring () {
    return {
      id: 'id',
      entityId: 'entityId',
    };
  }

  render () {
    const labelOf = this.getWidgetToEntityMapper (Label, 'text');
    const Title = labelOf ('.name');
    return (
      <Container kind="column-full">
        <Container kind="pane-header">
          <Title kind="pane-header" />
        </Container>
      </Container>
    );
  }
}

export default GlyphDetail;
