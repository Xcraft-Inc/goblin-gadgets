import React from 'react';
import Form from 'laboratory/form';
import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import LabelTextField from 'gadgets/label-text-field/widget';
import TextFieldCombo from 'gadgets/text-field-combo/widget';

const glyphs = [
  'ban',
  'bell',
  'bell-o',
  'bicycle',
  'bookmark',
  'bookmark-o',
  'car',
  'check',
  'circle',
  'clock-o',
  'close',
  'comment',
  'comment-o',
  'cube',
  'envelope',
  'envelope-o',
  'eye',
  'flash',
  'heart',
  'heart-o',
  'lock',
  'minus-square',
  'minus-square-o',
  'pencil',
  'phone',
  'plus',
  'plus-square',
  'plus-square-o',
  'question-circle',
  'random',
  'search',
  'shopping-basket',
  'star',
  'star-o',
  'train',
  'trash',
  'truck',
  'unlock',
  'user',
  'warning',
];

const colors = [
  '',
  'base',
  'primary',
  'secondary',
  'success',
  'pick',
  'drop',
  'task',
];

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
    const Sample = this.getWidgetToEntityMapper (Label, g => {
      return {
        glyph: g.get ('glyph'),
        glyphColor: g.get ('color'),
      };
    }) ('');

    return (
      <Container kind="view" width="500px">
        <Form {...this.entityConfig}>
          <Container kind="pane-header">
            <Title kind="pane-header" />
          </Container>
          <Container kind="panes">
            <Container kind="pane">

              <Container kind="row-pane">
                <Label text="Définition du pictogramme" kind="title" />
              </Container>

              <Container kind="row-pane">
                <LabelTextField
                  labelGlyph="tag"
                  grow="1"
                  hintText="Nom du pictogramme"
                  model=".name"
                />
              </Container>

              <Container kind="row-pane">
                <LabelTextField
                  labelGlyph="comment"
                  grow="2"
                  hintText="Description"
                  model=".description"
                  rows="4"
                />
              </Container>

              <Container kind="row-pane">
                <Label
                  glyph="picture-o"
                  kind="label-text-field"
                  justify="left"
                  spacing="overlap"
                />
                <TextFieldCombo
                  grow="1"
                  hintText="Pictogramme (font-awesome)"
                  model=".glyph"
                  onSetText={text => {
                    this.setEntityValue ('.glyph', text);
                  }}
                  list={glyphs}
                  menuType="wrap"
                  menuItemWidth="200px"
                />
              </Container>

              <Container kind="row-pane">
                <Label
                  glyph="paint-brush"
                  kind="label-text-field"
                  justify="left"
                  spacing="overlap"
                />
                <TextFieldCombo
                  grow="1"
                  hintText="Couleur"
                  model=".color"
                  onSetText={text => {
                    this.setEntityValue ('.color', text);
                  }}
                  list={colors}
                  menuType="wrap"
                  menuItemWidth="200px"
                />
              </Container>

              <Container kind="row-pane">
                <Sample
                  glyphSize="500%"
                  height="150px"
                  grow="1"
                  justify="center"
                  insideButton="true"
                />
              </Container>

            </Container>
          </Container>
        </Form>
      </Container>
    );
  }
}

export default GlyphEditor;
