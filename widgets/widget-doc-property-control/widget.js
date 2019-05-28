import React from 'react';
import Widget from 'laboratory/widget';
import Container from 'goblin-gadgets/widgets/container/widget';
import TextFieldBasis from 'goblin-gadgets/widgets/text-field-basis/widget';
import TextFieldCombo from 'goblin-gadgets/widgets/text-field-combo/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import Label from 'goblin-gadgets/widgets/label/widget';

/******************************************************************************/

const List = {
  color: [
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
  ],
  glyph: [
    '',
    'solid/check',
    'solid/times',
    'solid/bicycle',
    'solid/car',
    'solid/rocket',
    'solid/calendar',
  ],
  size: [
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
  ],
  component: ['short-text', 'long-text', 'button', 'button-10'],
  function: ['alert', 'log'],
  shape: [
    '',
    'rounded',
    'left-rounded',
    'right-rounded',
    'left-smooth',
    'right-smooth',
  ],
  angle: ['', '90', '180', '270'],
  percentage: ['', '50%', '75%', '100%', '150%', '200%'],
  spacing: ['', 'overlap', 'tiny', 'large', 'double'],
  shortcut: ['', '_ctrl_+A', '_shift_+A', '_alt_+A'],
  grow: ['', '0.5', '1'],
  fontStyle: ['', 'italic', 'oblique'],
  cursor: [
    '',
    'default',
    'none',
    'pointer',
    'cell',
    'crosshair',
    'text',
    'move',
    'not-allowed',
    'ew-resize',
    'ns-resize',
    'grab',
  ],
  fontWeight: ['', 'bold', 'bolder', 'lighter'],
  textTransform: ['', 'capitalize', 'uppercase', 'lowercase'],
  justify: ['', 'start', 'center', 'end', 'around', 'between', 'none'],
};

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

  /******************************************************************************/

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
          menuType="wrap"
          menuItemWidth="200px"
        />
      </React.Fragment>
    );
  }

  renderControl() {
    const type = this.props.type.type;
    switch (type) {
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
      case 'glyph':
      case 'size':
      case 'component':
      case 'shortcut':
      case 'angle':
      case 'percentage':
      case 'fontWeight':
        return this.renderCombo(List[type], false);
      case 'function':
      case 'shape':
      case 'spacing':
      case 'grow':
      case 'fontStyle':
      case 'cursor':
      case 'textTransform':
      case 'justify':
        return this.renderCombo(List[type], true);
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
          glyph="solid/eraser"
          onClick={this.clear}
          visibility={this.props.value !== undefined}
        />
      </Container>
    );
  }
}

/******************************************************************************/

export default Widget.connectWidget((state, props) => {
  return {
    value: state.get(props.path),
  };
})(WidgetDocPropertyControl);
