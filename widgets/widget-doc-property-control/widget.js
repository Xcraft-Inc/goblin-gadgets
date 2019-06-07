import React from 'react';
import Widget from 'laboratory/widget';
import TextFieldBasis from 'goblin-gadgets/widgets/text-field-basis/widget';
import TextFieldCombo from 'goblin-gadgets/widgets/text-field-combo/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import {isShredder} from 'xcraft-core-shredder';
import CheckBoxInput from 'goblin-gadgets/widgets/check-box-input/widget';

/******************************************************************************/

class WidgetDocPropertyControl extends Widget {
  constructor() {
    super(...arguments);
    this.onChange = this.onChange.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.clear = this.clear.bind(this);
    if (this.props.type.type === 'oneOfType') {
      this.state = {
        type: this.props.type.values[0],
      };
    }
  }

  onChange(value) {
    this.dispatch({type: 'SET', path: this.props.path, value});
  }

  onChangeType(type) {
    this.setState({type});
  }

  onChangeNumber(value) {
    this.onChange(Number(value));
  }

  clear() {
    this.dispatch({type: 'DEL', path: this.props.path});
  }

  /******************************************************************************/

  renderCombo(list, readonly, multiline) {
    let value = list.find(item => {
      if (isShredder(this.props.value)) {
        // For prop dataTable.
        const y = JSON.stringify(this.props.value.toJS(), null, 1);
        const x = JSON.stringify(item.value, null, 1);
        return x === y;
      } else if (typeof item === 'object') {
        return item.value === this.props.value;
      } else {
        return item === this.props.value;
      }
    });
    if (typeof value === 'object') {
      value = value.text;
    }
    return (
      <React.Fragment>
        <TextFieldBasis
          shape="left-smooth"
          spacing="overlap"
          readonly={readonly}
          rows={multiline ? '5' : null}
          value={value || this.props.value}
          onChange={readonly ? null : this.onChange}
          grow="1"
        />
        <TextFieldCombo
          spacing="tiny"
          list={list}
          defaultValue={value}
          onSetText={this.onChange}
          menuType="wrap"
          menuItemWidth="200px"
        />
      </React.Fragment>
    );
  }

  renderControl() {
    const widget = this.props.type.widget;
    if (!widget) {
      throw new Error(
        `Controller is not defined for type ${this.props.type.type}`
      );
    }

    switch (widget) {
      case 'oneOfType':
        // eslint-disable-next-line no-case-declarations
        const list = this.props.type.values.map(item => {
          return {text: item.type, value: item};
        });
        return (
          <React.Fragment>
            <TextFieldCombo
              spacing="tiny"
              comboGlyph="solid/ellipsis-v"
              list={list}
              defaultValue={this.state.type.type}
              onSetText={this.onChangeType}
              menuType="wrap"
              menuItemWidth="200px"
            />
            <WidgetDocPropertyControl
              widgetId={this.props.widgetId}
              path={this.props.path}
              type={this.state.type}
              value={this.props.value}
            />
          </React.Fragment>
        );
      case 'text-field':
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
      case 'check-box':
        return (
          <React.Fragment>
            <CheckBoxInput
              kind="simple"
              width="32px"
              checked={this.props.value}
              onChange={this.onChange}
            />
            <Label grow="1" />
          </React.Fragment>
        );
      case 'combo': {
        const list = this.props.type.samples || this.props.type.values;
        const readonly = this.props.type.readonly;
        const multiline = this.props.type.multiline;
        return this.renderCombo(list, readonly, multiline);
      }
    }
  }

  render() {
    return (
      <div className={this.styles.classNames.control}>
        {this.renderControl()}
        {this.props.type.type !== 'oneOfType' && (
          <Button
            kind="combo"
            glyph="solid/eraser"
            onClick={this.clear}
            visibility={this.props.value !== undefined}
          />
        )}
      </div>
    );
  }
}

/******************************************************************************/

export default Widget.connectWidget((state, props) => {
  return {
    value: state.get(props.path),
  };
})(WidgetDocPropertyControl);
