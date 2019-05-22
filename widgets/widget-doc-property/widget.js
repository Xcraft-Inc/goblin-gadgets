import React from 'react';
import Widget from 'laboratory/widget';
import Container from 'goblin-gadgets/widgets/container/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import TextFieldBasis from 'goblin-gadgets/widgets/text-field-basis/widget';
import CheckButton from 'goblin-gadgets/widgets/check-button/widget';
import TextFieldCombo from 'goblin-gadgets/widgets/text-field-combo/widget';

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
      case 'string':
      default:
        return (
          <TextFieldBasis value={this.props.value} onChange={this.onChange} />
        );
    }
  }
}

const Control = Widget.connectWidget((state, props) => {
  return {
    value: state.get(props.path),
  };
})(WidgetDocPropertyControl);

/******************************************************************************/

class WidgetDocProperty extends Widget {
  renderType() {
    return <Label text={this.props.prop.type.type} />;
  }

  renderRequired() {
    if (this.props.prop.required) {
      return <Label text="required" />;
    }
  }

  renderDefaultValue() {
    if (this.props.prop.defaultValue) {
      return <Label text={JSON.stringify(this.props.prop.defaultValue)} />;
    }
  }

  renderControl() {
    const name = this.props.prop.name;
    return (
      <Control
        widgetId={this.props.widgetId}
        path={`props.${name}`}
        type={this.props.prop.type}
      />
    );
  }

  render() {
    return (
      <div className={this.styles.classNames.propertyContainer}>
        <Container kind="row">
          <Label text={this.props.prop.name} />
          {this.renderType()}
          {this.renderRequired()}
          {this.renderDefaultValue()}
        </Container>
        {this.renderControl()}
      </div>
    );
  }
}

export default Widget.connectWidget(state => {
  return {
    selectedWidget: state.get('selectedWidget'),
  };
})(WidgetDocProperty);

/******************************************************************************/
