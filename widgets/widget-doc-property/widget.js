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

  renderRequiredOrDefaultValue() {
    if ('defaultValue' in this.props.prop) {
      return (
        <Label
          className={this.styles.classNames.defaultValue}
          text={JSON.stringify(this.props.prop.defaultValue)}
        />
      );
    } else if (this.props.prop.required) {
      return (
        <Label className={this.styles.classNames.required} text="required" />
      );
    } else {
      return (
        <Label className={this.styles.classNames.optional} text="optional" />
      );
    }
  }

  renderControl() {
    const name = this.props.prop.name;
    return (
      <div className={this.styles.classNames.control}>
        <WidgetDocPropertyControl
          widgetId={this.props.widgetId}
          path={`${this.props.path}.${name}`}
          type={this.props.prop.type}
        />
      </div>
    );
  }

  renderDescription() {
    if (this.props.prop.description) {
      return (
        <Label
          className={this.styles.classNames.description}
          text={this.props.prop.description}
        />
      );
    }
  }

  render_OLD() {
    return (
      <div className={this.styles.classNames.propertyContainer}>
        <div className={this.styles.classNames.propertyRowContainer}>
          <Label
            className={this.styles.classNames.name}
            text={this.props.prop.name}
          />
          {this.renderType()}
          {this.renderRequiredOrDefaultValue()}
        </div>
        {this.renderControl()}
        {this.renderDescription()}
      </div>
    );
  }

  render() {
    return (
      <div className={this.styles.classNames.propertyContainer}>
        <div className={this.styles.classNames.propertyRowContainer}>
          <Label
            className={this.styles.classNames.name}
            text={this.props.prop.name}
          />
          {this.renderControl()}
          {this.renderType()}
          {this.renderRequiredOrDefaultValue()}
        </div>
        {this.renderDescription()}
      </div>
    );
  }
}

/******************************************************************************/
