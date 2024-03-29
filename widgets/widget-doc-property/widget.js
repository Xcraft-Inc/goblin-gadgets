import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import WidgetDocPropertyControl from '../widget-doc-property-control/widget';
import * as styles from './styles';
import fullTypeName from 'xcraft-core-stones/full-type-name.js';

/******************************************************************************/

class WidgetDocProperty extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  renderControl() {
    return (
      <div className={this.styles.classNames.control}>
        <WidgetDocPropertyControl
          widgetId={this.props.widgetId}
          path={this.props.path}
          type={this.props.prop.type}
          min={this.props.prop.min}
          max={this.props.prop.max}
          step={this.props.prop.step}
          log={this.props.prop.log}
        />
      </div>
    );
  }

  renderType() {
    let t = fullTypeName(this.props.prop.type.type);
    if (t === 'enumeration') {
      t = 'enum';
    }
    t = t.replace('<any>', '');
    return (
      <Label
        className={this.styles.classNames.type}
        wrap="no"
        text={t}
        tooltip={t}
      />
    );
  }

  renderRequiredOrDefaultValue() {
    if ('defaultValue' in this.props.prop) {
      return (
        <Label
          className={this.styles.classNames.defaultValue}
          wrap="no"
          text={JSON.stringify(this.props.prop.defaultValue)}
        />
      );
    } else if (this.props.prop.required) {
      return (
        <Label
          className={this.styles.classNames.required}
          wrap="no"
          text="required"
        />
      );
    } else {
      return (
        <Label
          className={this.styles.classNames.optional}
          wrap="no"
          text="optional"
        />
      );
    }
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

  render() {
    return (
      <div className={this.styles.classNames.propertyContainer}>
        <div className={this.styles.classNames.propertyRowContainer}>
          <Label
            className={this.styles.classNames.name}
            wrap="no"
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

export default WidgetDocProperty;
