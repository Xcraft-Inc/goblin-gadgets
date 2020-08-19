import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import TextFieldNC from 'goblin-gadgets/widgets/text-field-nc/widget';
import ButtonCombo from 'goblin-gadgets/widgets/button-combo/widget';
import TextFieldComboNC from 'goblin-gadgets/widgets/text-field-combo-nc/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import CheckboxNC from 'goblin-gadgets/widgets/checkbox-nc/widget';
import * as styles from './styles';
import TextFieldTypedNC from '../text-field-typed-nc/widget';

/******************************************************************************/

// Fixes a nasty bug with OneOfType that does not appear, according to the order of
// choice of components. It is necessary to extract this code in a separate component,
// to avoid a strange bug with this.state === null!
class OneOfTypeControl extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.onChangeType = this.onChangeType.bind(this);
  }

  onChangeType(item) {
    const value = {
      value: undefined,
      type: item.id,
    };
    this.dispatch({type: 'SET_PROP', path: this.props.path, value});
  }

  get currentValue() {
    if (this.props.value !== null && typeof this.props.value === 'object') {
      return this.props.value.get('value');
    } else {
      return this.props.value;
    }
  }

  get currentType() {
    if (this.props.value !== null && typeof this.props.value === 'object') {
      return this.props.value.get('type');
    } else if (this.props.type.type === 'oneOfType') {
      return this.props.type.types[0].type;
    } else {
      return this.props.type.type;
    }
  }

  getType() {
    for (let i = 0; i < this.props.type.types.length; i++) {
      if (this.props.type.types[i].type === this.currentType) {
        return this.props.type.types[i];
      }
    }
    return this.props.type.types[0];
  }

  render() {
    const list = this.props.type.types.map((item) => {
      return {
        id: item.type,
        text: item.type,
        value: item,
        action: this.onChangeType,
        active: this.currentType === item.type,
      };
    });

    return (
      <React.Fragment>
        <ButtonCombo
          horizontalSpacing="tiny"
          comboGlyph="solid/ellipsis-v"
          list={list}
          selectedId={this.currentType}
          menuType="wrap"
          menuItemWidth="200px"
        />
        <WidgetDocPropertyControl
          widgetId={this.props.widgetId}
          path={this.props.path}
          type={this.getType()}
          value={this.currentValue}
          isOneOfType={true}
        />
      </React.Fragment>
    );
  }
}

/******************************************************************************/

class WidgetDocPropertyControl extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.onChange = this.onChange.bind(this);
    this.onChangeCombo = this.onChangeCombo.bind(this);
    this.clear = this.clear.bind(this);
  }

  onChangeCombo(item) {
    this.onChange(item.id);
  }

  onChange(value) {
    if (this.props.isOneOfType) {
      value = {
        value,
        type: this.props.type.type,
      };
    }
    this.dispatch({type: 'SET_PROP', path: this.props.path, value});
  }

  clear() {
    if (this.props.isOneOfType) {
      const value = {
        value: undefined,
        type: this.props.type.type,
      };
      this.dispatch({type: 'SET_PROP', path: this.props.path, value});
    } else {
      this.dispatch({type: 'DEL_PROP', path: this.props.path});
    }
  }

  get currentValue() {
    if (this.props.value !== null && typeof this.props.value === 'object') {
      return this.props.value.get('value');
    } else if (typeof this.props.value === 'number') {
      return this.props.value + '';
    } else {
      return this.props.value;
    }
  }

  get currentType() {
    if (this.props.value !== null && typeof this.props.value === 'object') {
      return this.props.value.get('type');
    } else {
      return this.props.type.type;
    }
  }

  /******************************************************************************/

  renderColor(list, restrictsToList, multiline) {
    let selectedId = this.currentValue;
    if (selectedId === undefined) {
      selectedId = null;
    }

    return (
      <React.Fragment>
        <TextFieldTypedNC
          type={this.props.type.type}
          width="28px"
          horizontalSpacing="overlap"
          restrictsToList={restrictsToList}
          rows={multiline ? 2 : null}
          value={selectedId}
          onChange={this.onChange}
          menuType="wrap"
          menuItemWidth="200px"
        />
        <TextFieldComboNC
          shape="smooth"
          horizontalSpacing="tiny"
          restrictsToList={restrictsToList}
          rows={multiline ? 2 : null}
          grow="1"
          list={list}
          selectedId={selectedId}
          onChange={this.onChange}
          menuType="wrap"
          menuItemWidth="200px"
        />
      </React.Fragment>
    );
  }

  renderCombo(list, restrictsToList, multiline) {
    if (this.props.type.type === 'color') {
      return this.renderColor(list, restrictsToList, multiline);
    } else if (
      this.props.type.type === 'date' ||
      this.props.type.type === 'time' ||
      this.props.type.type === 'datetime' ||
      this.props.type.type === 'price' ||
      this.props.type.type === 'weight' ||
      this.props.type.type === 'length' ||
      this.props.type.type === 'pixel' ||
      this.props.type.type === 'volume' ||
      this.props.type.type === 'number' ||
      this.props.type.type === 'integer' ||
      this.props.type.type === 'double' ||
      this.props.type.type === 'percent' ||
      this.props.type.type === 'delay'
    ) {
      let selectedId = this.currentValue;
      if (selectedId === undefined) {
        selectedId = null;
      }

      return (
        <React.Fragment>
          <TextFieldTypedNC
            type={this.props.type.type}
            min={this.props.min}
            max={this.props.max}
            grow="1"
            width="unset"
            shape="smooth"
            horizontalSpacing="overlap"
            restrictsToList={restrictsToList}
            rows={multiline ? 2 : null}
            value={selectedId}
            onChange={this.onChange}
            menuType="wrap"
            menuItemWidth="200px"
          />
          <ButtonCombo
            horizontalSpacing="tiny"
            list={list}
            selectedId={selectedId}
            onChange={this.onChangeCombo}
            menuType="wrap"
            menuItemWidth="200px"
          />
        </React.Fragment>
      );
    } else {
      let selectedId = this.currentValue;
      if (selectedId === undefined) {
        selectedId = '';
      } else if (typeof selectedId === 'object') {
        // When the scenarios returns a react fragment for property 'children' (by example),
        // the value received here is a Shredder. In this case, the combo will display 'object'.
        selectedId = 'object';
      } else if (typeof selectedId === 'function') {
        // When the scenarios returns a function for property 'onAdd' (by example),
        // the value received here is a function. In this case, the combo will display 'function'.
        selectedId = 'function';
      }

      return (
        <TextFieldComboNC
          shape="smooth"
          horizontalSpacing="tiny"
          restrictsToList={restrictsToList}
          rows={multiline ? 2 : null}
          grow="1"
          list={list}
          selectedId={selectedId}
          onChange={this.onChange}
          menuType="wrap"
          menuItemWidth="200px"
        />
      );
    }
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
        return (
          <OneOfTypeControl
            widgetId={this.props.widgetId}
            path={this.props.path}
            type={this.props.type}
            value={this.props.value}
          />
        );
      case 'text-field':
      default:
        return (
          <TextFieldNC
            horizontalSpacing="tiny"
            shape="smooth"
            value={this.currentValue || ''}
            onChange={this.onChange}
            grow="1"
          />
        );
      case 'checkbox':
        return (
          <React.Fragment>
            <CheckboxNC
              kind="big"
              checked={this.currentValue}
              onChange={this.onChange}
            />
            <Label grow="1" />
          </React.Fragment>
        );
      case 'combo': {
        const list = this.props.type.samples || this.props.type.values;
        const restrictsToList = this.props.type.restrictsToList;
        const multiline = this.props.type.multiline;
        return this.renderCombo(list, restrictsToList, multiline);
      }
    }
  }

  render() {
    return (
      <div className={this.styles.classNames.widgetDocPropertyControl}>
        {this.renderControl()}
        {this.props.type.type !== 'oneOfType' && (
          <Button
            kind="combo"
            glyph="solid/eraser"
            onClick={this.clear}
            visibility={this.currentValue !== undefined}
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
