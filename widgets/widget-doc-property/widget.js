import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import WidgetDocPropertyControl from '../widget-doc-property-control/widget';
import * as styles from './styles';

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
        />
      </div>
    );
  }

  renderType() {
    let t = this.props.prop.type.type;
    if (typeof this.props.value === 'object') {
      t = this.props.value.get('type');
      if (typeof t === 'symbol') {
        t = 'component'; // <React.Fragment>
      }
    } else if (t === 'oneOfType') {
      t = this.props.prop.type.types[0].type;
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
  return {path, value};
})(WidgetDocProperty);
