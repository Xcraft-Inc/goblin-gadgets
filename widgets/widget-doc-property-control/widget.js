import React from 'react';
import Widget from 'laboratory/widget';
import Container from 'goblin-gadgets/widgets/container/widget';
import TextFieldBasis from 'goblin-gadgets/widgets/text-field-basis/widget';
import CheckButton from 'goblin-gadgets/widgets/check-button/widget';
import TextFieldCombo from 'goblin-gadgets/widgets/text-field-combo/widget';

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

/******************************************************************************/

class WidgetDocPropertyControl extends Widget {
  constructor() {
    super(...arguments);
    this.onChange = this.onChange.bind(this);
    this.onCheckButtonClick = this.onCheckButtonClick.bind(this);
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

  render() {
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
          <Container kind="row">
            <TextFieldBasis value={this.props.value} disabled={true} />
            <TextFieldCombo
              list={this.props.type.values}
              defaultValue={this.props.value}
              onSetText={this.onChange}
              menuType="combo"
            />
          </Container>
        );
      case 'color':
        return (
          <Container kind="row">
            <TextFieldBasis value={this.props.value} onChange={this.onChange} />
            <TextFieldCombo
              list={colorList}
              defaultValue={this.props.value}
              onSetText={this.onChange}
              menuType="combo"
            />
          </Container>
        );
      case 'glyph':
        return (
          <Container kind="row">
            <TextFieldBasis value={this.props.value} onChange={this.onChange} />
            <TextFieldCombo
              list={glyphList}
              defaultValue={this.props.value}
              onSetText={this.onChange}
              menuType="combo"
            />
          </Container>
        );
      case 'size':
        return (
          <Container kind="row">
            <TextFieldBasis value={this.props.value} onChange={this.onChange} />
            <TextFieldCombo
              list={sizeList}
              defaultValue={this.props.value}
              onSetText={this.onChange}
              menuType="combo"
            />
          </Container>
        );
      case 'string':
      default:
        return (
          <TextFieldBasis value={this.props.value} onChange={this.onChange} />
        );
    }
  }
}

export default Widget.connectWidget((state, props) => {
  return {
    value: state.get(props.path),
  };
})(WidgetDocPropertyControl);
