import React from 'react';
import Widget from 'laboratory/widget';
import Container from 'goblin-gadgets/widgets/container/widget';
import TextFieldBasis from 'goblin-gadgets/widgets/text-field-basis/widget';
import TextFieldCombo from 'goblin-gadgets/widgets/text-field-combo/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import Label from 'goblin-gadgets/widgets/label/widget';

/******************************************************************************/

const colorList = [
  '',
  'base',
  'primary',
  'secondary',
  'success',
  'pick',
  'drop',
  'task',
  'white',
  'lightgrey',
  'grey',
  'black',
  'red',
  'green',
  'blue',
  'yellow',
  '#d2e6f9 — light blue',
  '#8ab6df — blue',
  '#f5ddb8 — light orange',
  '#fbce89 — orange',
  '#c6f7da — light green',
  '#74f7a9 — green',
];

const glyphList = [
  '',
  'solid/check',
  'solid/times',
  'solid/bicycle',
  'solid/car',
  'solid/rocket',
  'solid/calendar',
];

const sizeList = [
  '',
  '0px',
  '1px',
  '2px',
  '10px',
  '20px',
  '32px',
  '50px',
  '100px',
  '200px',
  '300px',
  '500px',
];

const componentList = ['short-text', 'long-text', 'button', 'button-10'];

const functionList = ['alert', 'log'];

/******************************************************************************/

class WidgetDocPropertyControl extends Widget {
  constructor() {
    super(...arguments);
    this.onChange = this.onChange.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onCheckButtonClick = this.onCheckButtonClick.bind(this);
    this.clear = this.clear.bind(this);
  }

  onChange(value) {
    this.dispatch({type: 'SET', path: this.props.path, value});
  }

  onChangeNumber(value) {
    this.onChange(Number(value));
  }

  onCheckButtonClick() {
    this.onChange(!this.props.value);
  }

  clear() {
    this.dispatch({type: 'DEL', path: this.props.path});
  }

  renderCombo(list, readonly) {
    return (
      <React.Fragment>
        <TextFieldBasis
          shape="left-smooth"
          spacing="overlap"
          readonly={readonly}
          value={this.props.value}
          onChange={readonly ? null : this.onChange}
          grow="1"
        />
        <TextFieldCombo
          spacing="tiny"
          list={list}
          defaultValue={this.props.value}
          onSetText={this.onChange}
          menuType="combo"
        />
      </React.Fragment>
    );
  }

  renderControl() {
    switch (this.props.type.type) {
      case 'bool':
        return (
          <React.Fragment>
            <Button
              width="32px"
              focusable="true"
              glyph={this.props.value ? 'solid/check' : null}
              onClick={this.onCheckButtonClick}
            />
            <Label grow="1" />
          </React.Fragment>
        );
      case 'enum':
        return this.renderCombo(this.props.type.values, true);
      case 'color':
        return this.renderCombo(colorList, false);
      case 'glyph':
        return this.renderCombo(glyphList, false);
      case 'size':
        return this.renderCombo(sizeList, false);
      case 'component':
        return this.renderCombo(componentList, false);
      case 'function':
        return this.renderCombo(functionList, true);
      case 'string':
      default:
        return (
          <TextFieldBasis
            spacing="tiny"
            shape="smooth"
            value={this.props.value}
            onChange={this.onChange}
            grow="1"
          />
        );
    }
  }

  render() {
    return (
      <Container kind="row">
        {this.renderControl()}
        <Button
          kind="combo"
          glyph="solid/times"
          onClick={this.clear}
          visibility={this.props.value !== undefined}
        />
      </Container>
    );
  }
}

export default Widget.connectWidget((state, props) => {
  return {
    value: state.get(props.path),
  };
})(WidgetDocPropertyControl);
