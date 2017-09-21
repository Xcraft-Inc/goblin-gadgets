import React from 'react';
import Form from 'laboratory/form';
import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import LabelTextField from 'gadgets/label-text-field/widget';

class GlyphSearch extends Form {
  constructor () {
    super (...arguments);
  }

  static get wiring () {
    return {
      id: 'id',
    };
  }

  render () {
    const {id} = this.props;

    const Form = this.Form;

    return (
      <Container kind="view" width="400px" spacing="large">
        <Container kind="pane-header">
          <Label text="Recherche" kind="pane-header" />
        </Container>
        <Container kind="panes" navigationName="search">
          <Container kind="pane">
            <Container kind="row-pane">
              <Label text="Pictogrammes" grow="1" kind="title" />
            </Container>
            <Form {...this.formConfig}>
              <Container kind="row-pane">
                <LabelTextField
                  defaultFocus="true"
                  hinter="glyph"
                  labelGlyph="search"
                  hintText="Nom du pictogramme"
                  grow="1"
                />
              </Container>
            </Form>
          </Container>
        </Container>
      </Container>
    );
  }
}

export default GlyphSearch;
