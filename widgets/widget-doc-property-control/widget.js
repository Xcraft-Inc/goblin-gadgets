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
    const value = undefined;
    const typeName = item.id;
    this.dispatch({type: 'SET_PROP', path: this.props.path, value, typeName});
  }

  getType() {
    for (let i = 0; i < this.props.type.types.length; i++) {
      if (this.props.type.types[i].type.name === this.props.selectedType) {
        return this.props.type.types[i];
      }
    }
    return this.props.type.types[0];
  }

  render() {
    const list = this.props.type.types.map((item) => {
      return {
        id: item.type.name,
        text: item.type.name,
        value: item,
        action: this.onChangeType,
        active: this.props.selectedType === item.type.name,
      };
    });

    return (
      <>
        <ButtonCombo
          horizontalSpacing="tiny"
          comboGlyph="solid/ellipsis-v"
          list={list}
          selectedId={this.props.selectedType}
          menuType="wrap"
          menuItemWidth="200px"
        />
        <WidgetDocPropertyControl
          widgetId={this.props.widgetId}
          path={this.props.path}
          type={this.getType()}
          value={this.props.value}
          isOneOfType={true}
        />
      </>
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
    let typeName;
    if (this.props.isOneOfType) {
      typeName = this.props.type.type.name;
    }
    this.dispatch({type: 'SET_PROP', path: this.props.path, value, typeName});
  }

  clear() {
    this.dispatch({type: 'DEL_PROP', path: this.props.path});
  }

  getComboList() {
    const type = this.props.type;
    const list = type.samples || type.type.values;
    const comboList = list.map((item) =>
      item && typeof item === 'object'
        ? {...item, id: item.value}
        : {id: item, text: item}
    );
    return comboList;
  }

  /******************************************************************************/

  renderColor() {
    let selectedId = this.props.value;
    if (selectedId === undefined) {
      selectedId = null;
    }

    return (
      <>
        <TextFieldTypedNC
          type="color"
          width="28px"
          horizontalSpacing="overlap"
          restrictsToList={false}
          value={selectedId}
          onChange={this.onChange}
          menuType="wrap"
          menuItemWidth="200px"
        />
        <TextFieldComboNC
          shape="smooth"
          horizontalSpacing="tiny"
          restrictsToList={false}
          grow="1"
          list={this.getComboList()}
          selectedId={selectedId}
          onChange={this.onChange}
          menuType="wrap"
          menuItemWidth="200px"
        />
      </>
    );
  }

  renderCombo() {
    let selectedId = this.props.value;
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

    const type = this.props.type;
    const restrictsToList =
      type.restrictsToList || type.type.name === 'enumeration';
    const multiline = type.multiline;

    return (
      <TextFieldComboNC
        shape="smooth"
        horizontalSpacing="tiny"
        restrictsToList={restrictsToList}
        rows={multiline ? 2 : null}
        grow="1"
        list={this.getComboList()}
        selectedId={selectedId}
        onChange={this.onChange}
        menuType="wrap"
        menuItemWidth="200px"
      />
    );
  }

  renderTyped(widgetType) {
    let selectedId = this.props.value;
    if (selectedId === undefined) {
      selectedId = null;
    }

    const restrictsToList = this.props.type.type.name === 'enumeration';

    return (
      <>
        <TextFieldTypedNC
          type={widgetType}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          log={this.props.log}
          grow="1"
          width="unset"
          shape="smooth"
          hasSlider="yes"
          horizontalSpacing="overlap"
          restrictsToList={restrictsToList}
          // rows={multiline ? 2 : null}
          value={selectedId}
          onChange={this.onChange}
          menuType="wrap"
          menuItemWidth="200px"
        />
        <ButtonCombo
          horizontalSpacing="tiny"
          list={this.getComboList()}
          selectedId={selectedId}
          onChange={this.onChangeCombo}
          menuType="wrap"
          menuItemWidth="200px"
        />
      </>
    );
  }

  renderControl() {
    const widget = this.props.type.widget;
    if (!widget) {
      throw new Error(
        `Controller is not defined for type ${this.props.type.type.name}`
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
            selectedType={this.props.selectedType}
          />
        );
      case 'text-field':
      default:
        return (
          <TextFieldNC
            horizontalSpacing="tiny"
            shape="smooth"
            value={this.props.value || ''}
            onChange={this.onChange}
            grow="1"
          />
        );
      case 'checkbox':
        return (
          <>
            <CheckboxNC
              kind="big"
              checked={this.props.value}
              onChange={this.onChange}
            />
            <Label grow="1" />
          </>
        );
      case 'combo': {
        return this.renderCombo();
      }
      case 'color': {
        return this.renderColor();
      }
      // case 'typed':
      case 'date':
      case 'time':
      case 'datetime':
      case 'price':
      case 'weight':
      case 'length':
      case 'pixel':
      case 'volume':
      case 'number':
      case 'integer':
      case 'double':
      case 'percent':
      case 'percentage':
      case 'delay': {
        return this.renderTyped(widget);
      }
    }
  }

  render() {
    return (
      <div className={this.styles.classNames.widgetDocPropertyControl}>
        {this.renderControl()}
        {!this.props.isOneOfType && (
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
    value: state.get('props').get(props.path),
    selectedType: state.get('selectedTypeProps').get(props.path),
  };
})(WidgetDocPropertyControl);
