import React from 'react';
import Widget from 'laboratory/widget';
import TextFieldNC from 'goblin-gadgets/widgets/text-field-nc/widget';
import ButtonCombo from 'goblin-gadgets/widgets/button-combo/widget';
import TextFieldComboNC from 'goblin-gadgets/widgets/text-field-combo-nc/widget';
import TextFieldTypedComboNC from 'goblin-gadgets/widgets/text-field-typed-combo-nc/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import CheckboxNC from 'goblin-gadgets/widgets/checkbox-nc/widget';

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
        type: this.props.type.types[0],
      };
    }
  }

  onChange(value) {
    this.dispatch({type: 'SET_PROP', path: this.props.path, value});
  }

  onChangeType(item) {
    this.clear();
    this.setState({type: item.value});
  }

  onChangeNumber(value) {
    this.onChange(Number(value));
  }

  clear() {
    this.dispatch({type: 'DEL_PROP', path: this.props.path});
  }

  /******************************************************************************/

  renderCombo(list, restrictsToList, multiline) {
    if (
      this.props.type.type === 'date' ||
      this.props.type.type === 'time' ||
      this.props.type.type === 'datetime' ||
      this.props.type.type === 'price' ||
      this.props.type.type === 'weight' ||
      this.props.type.type === 'length' ||
      this.props.type.type === 'volume' ||
      this.props.type.type === 'number' ||
      this.props.type.type === 'percent' ||
      this.props.type.type === 'delay'
    ) {
      let selectedId = this.props.value;
      if (selectedId === undefined) {
        selectedId = null;
      }

      return (
        <TextFieldTypedComboNC
          type={this.props.type.type}
          shape="smooth"
          horizontalSpacing="tiny"
          restrictsToList={restrictsToList}
          rows={multiline ? '2' : null}
          grow="1"
          list={list}
          selectedId={selectedId}
          onChange={this.onChange}
          menuType="wrap"
          menuItemWidth="200px"
        />
      );
    } else {
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

      return (
        <TextFieldComboNC
          shape="smooth"
          horizontalSpacing="tiny"
          restrictsToList={restrictsToList}
          rows={multiline ? '2' : null}
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
        // eslint-disable-next-line no-case-declarations
        const list = this.props.type.types.map(item => {
          return {
            id: item.type,
            text: item.type,
            value: item,
            action: this.onChangeType,
            active: this.state.type.type === item.type,
          };
        });
        return (
          <React.Fragment>
            <ButtonCombo
              horizontalSpacing="tiny"
              comboGlyph="solid/ellipsis-v"
              list={list}
              selectedId={this.state.type.type}
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
          <React.Fragment>
            <CheckboxNC
              kind="big"
              checked={this.props.value}
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
