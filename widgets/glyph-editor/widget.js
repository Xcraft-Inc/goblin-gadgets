import React from 'react';
import Form from 'laboratory/form';
import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import LabelTextField from 'gadgets/label-text-field/widget';

class GlyphEditor extends Form {
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
    const {id} = this.props;
    if (!id) {
      return null;
    }
    const Form = this.Form;
    const Title = this.getWidgetToEntityMapper (Label, 'text') ('.name');

    return (
      <Container kind="view" wi dth="800px">
        <Form {...this.entityConfig}>
          <Container kind="pane-header">
            <Title kind="pane-header" />
          </Container>
          <Container kind="panes">
            <Container kind="pane">

              <LabelTextField
                grow="1"
                hintText="Nom du picto."
                model=".name"
                spacing="large"
              />

              <LabelTextField
                grow="2"
                hintText="Description"
                model=".description"
                spacing="large"
              />

              <LabelTextField
                grow="1"
                hintText="Pictogramme (font-awesome)"
                model=".glyph"
                spacing="large"
              />

              <LabelTextField grow="1" hintText="Couleur" model=".color" />

            </Container>
          </Container>
        </Form>
      </Container>
    );
  }
}

export default GlyphEditor;
