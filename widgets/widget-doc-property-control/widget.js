import React from 'react';
import Widget from 'laboratory/widget';
import Container from 'goblin-gadgets/widgets/container/widget';
import TextFieldBasis from 'goblin-gadgets/widgets/text-field-basis/widget';
import CheckButton from 'goblin-gadgets/widgets/check-button/widget';
import TextFieldCombo from 'goblin-gadgets/widgets/text-field-combo/widget';
import Button from 'goblin-gadgets/widgets/button/widget';

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

  renderControl() {
    switch (this.props.type.type) {
      case 'bool':
        return (
          <CheckButton
            kind="switch"
            checked={this.props.value}
            onClick={this.onCheckButtonClick}
          />
        );
      case 'enum':
        return (
          <React.Fragment>
            <TextFieldBasis value={this.props.value} disabled={true} grow="1" />
            <TextFieldCombo
              list={this.props.type.values}
              defaultValue={this.props.value}
              onSetText={this.onChange}
              menuType="combo"
            />
          </React.Fragment>
        );
      case 'color':
        return (
          <React.Fragment>
            <TextFieldBasis
              value={this.props.value}
              onChange={this.onChange}
              grow="1"
            />
            <TextFieldCombo
              list={colorList}
              defaultValue={this.props.value}
              onSetText={this.onChange}
              menuType="combo"
            />
          </React.Fragment>
        );
      case 'glyph':
        return (
          <React.Fragment>
            <TextFieldBasis
              value={this.props.value}
              onChange={this.onChange}
              grow="1"
            />
            <TextFieldCombo
              list={glyphList}
              defaultValue={this.props.value}
              onSetText={this.onChange}
              menuType="combo"
            />
          </React.Fragment>
        );
      case 'size':
        return (
          <React.Fragment>
            <TextFieldBasis
              value={this.props.value}
              onChange={this.onChange}
              grow="1"
            />
            <TextFieldCombo
              list={sizeList}
              defaultValue={this.props.value}
              onSetText={this.onChange}
              menuType="combo"
            />
          </React.Fragment>
        );
      case 'component':
        return (
          <React.Fragment>
            <TextFieldBasis
              value={this.props.value}
              onChange={this.onChange}
              grow="1"
            />
            <TextFieldCombo
              list={componentList}
              defaultValue={this.props.value}
              onSetText={this.onChange}
              menuType="combo"
            />
          </React.Fragment>
        );
      case 'function':
        return (
          <React.Fragment>
            <TextFieldBasis
              value={this.props.value}
              onChange={this.onChange}
              grow="1"
              disabled={true}
            />
            <TextFieldCombo
              list={functionList}
              defaultValue={this.props.value}
              onSetText={this.onChange}
              menuType="combo"
            />
          </React.Fragment>
        );
      case 'string':
      default:
        return (
          <TextFieldBasis value={this.props.value} onChange={this.onChange} />
        );
    }
  }

  render() {
    return (
      <Container kind="row">
        {this.renderControl()}
        <Button
          glyph="solid/times"
          kind="check-button"
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
