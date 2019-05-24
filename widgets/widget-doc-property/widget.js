import React from 'react';
import Widget from 'laboratory/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import WidgetDocPropertyControl from '../widget-doc-property-control/widget';

/******************************************************************************/

export default class WidgetDocProperty extends Widget {
  renderType() {
    return (
      <Label
        className={this.styles.classNames.type}
        text={this.props.prop.type.type}
      />
    );
  }

  renderRequired() {
    if (this.props.prop.required) {
      return (
        <Label className={this.styles.classNames.required} text="required" />
      );
    }
    return (
      <Label className={this.styles.classNames.optional} text="optional" />
    );
  }

  renderDefaultValue() {
    if ('defaultValue' in this.props.prop) {
      return (
        <React.Fragment>
          <Label
            className={this.styles.classNames.defaultValue}
            text={'default: ' + JSON.stringify(this.props.prop.defaultValue)}
          />
        </React.Fragment>
      );
    }
  }

  renderControl() {
    const name = this.props.prop.name;
    return (
      <WidgetDocPropertyControl
        widgetId={this.props.widgetId}
        path={`${this.props.path}.${name}`}
        type={this.props.prop.type}
      />
    );
  }

  renderDescription() {
    if (this.props.prop.description) {
      return (
        <div className={this.styles.classNames.propertyRowContainer}>
          <Label
            className={this.styles.classNames.description}
            text={this.props.prop.description}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div className={this.styles.classNames.propertyContainer}>
        <div className={this.styles.classNames.propertyRowContainer}>
          <Label
            className={this.styles.classNames.name}
            text={this.props.prop.name}
          />
          {this.renderType()}
          {this.renderRequired()}
          {this.renderDefaultValue()}
        </div>
        {this.renderControl()}
        {this.renderDescription()}
      </div>
    );
  }
}

/******************************************************************************/
