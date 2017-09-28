import React from 'react';
import Form from 'laboratory/form';

import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import Button from 'gadgets/button/widget';
import LabelTextField from 'gadgets/label-text-field/widget';
import TextFieldCombo from 'gadgets/text-field-combo/widget';
import Field from 'gadgets/field/widget';

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

function getGlyphs () {
  const result = [];
  for (let i = 0; i < glyphs.length; i++) {
    const text = glyphs[i];
    result.push ({glyph: text, text: text});
  }
  return result;
}

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

  renderActions () {
    return (
      <Container kind="actions">
        <Button
          width="0px"
          grow="1"
          kind="action"
          glyph="check"
          text="Terminer"
          place="1/3"
          onClick={this.onSubmit}
        />
        <Button
          width="0px"
          grow="1"
          kind="action"
          place="3/3"
          glyph="close"
          text="Annuler"
          onClick={this.onCancel}
        />
      </Container>
    );
  }

  renderForm () {
    const Sample = this.getWidgetToEntityMapper (Label, g => {
      return {
        glyph: g.get ('glyph'),
        glyphColor: g.get ('color'),
      };
    }) ('');

    return (
      <Container kind="pane">
        <Container kind="row-pane">
          <Label text="Pictogramme" kind="title" />
        </Container>

        <Field labelGlyph="tag" labelWidth="32px" model=".name" />

        <Field
          labelGlyph="comment"
          labelWidth="32px"
          hintText="Description"
          rows="4"
          model=".description"
        />

        <Field
          kind="combo"
          labelGlyph="picture-o"
          labelWidth="32px"
          hintText="Pictogramme (font-awesome)"
          model=".glyph"
          list={getGlyphs ()}
          menuItemWidth="200px"
        />

        <Field
          kind="combo"
          labelGlyph="paint-brush"
          labelWidth="32px"
          hintText="Couleur"
          model=".color"
          list={colors}
          menuItemWidth="200px"
        />

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
    );
  }

  render () {
    if (!this.props.id) {
      return null;
    }

    const Form = this.Form;
    const Title = this.getWidgetToEntityMapper (Label, 'text') ('.name');

    return (
      <Container kind="view" width="500px">
        <Container kind="pane-header">
          <Title kind="pane-header" />
        </Container>
        <Container kind="panes">
          <Form {...this.entityConfig}>
            {this.renderForm ()}
          </Form>
        </Container>
        {this.renderActions ()}
      </Container>
    );
  }
}

export default GlyphEditor;
