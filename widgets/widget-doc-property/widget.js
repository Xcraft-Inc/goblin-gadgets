import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import WidgetDocPropertyControl from '../widget-doc-property-control/widget';
import * as styles from './styles';

/******************************************************************************/

function getType(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const regexNumber____ = /^[-]?[0-9]*\.?[0-9]*$/g;
  const regexSize______ = /^[-]?[0-9]*\.?[0-9]*px/g;
  const regexPercentage = /^[-]?[0-9]*\.?[0-9]*%$/g;

  if (regexNumber____.test(value)) {
    return 'number';
  } else if (regexSize______.test(value)) {
    return 'size';
  } else if (regexPercentage.test(value)) {
    return 'percentage';
  } else {
    return null;
  }
}

function getInitialType(value, types) {
  const valueType = getType(value);
  if (valueType) {
    for (let i = 0; i < types.length; i++) {
      if (types[i].type === valueType) {
        return types[i];
      }
    }
  }

  return types[0];
}

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
          oneOfType={this.props.oneOfType}
        />
      </div>
    );
  }

  renderType() {
    let t = this.props.prop.type.type;
    if (this.props.oneOfType) {
      t = this.props.oneOfType.type;
    }
    return <Label className={this.styles.classNames.type} wrap="no" text={t} />;
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

export default Widget.connectWidget((state, props) => {
  const path = `${props.path}.${props.prop.name}`;
  const value = state.get(path);
  let oneOfType = null;
  if (props.prop.type.type === 'oneOfType' && props.prop.type.types) {
    oneOfType = getInitialType(value, props.prop.type.types);
  }

  return {path, value, oneOfType};
})(WidgetDocProperty);
