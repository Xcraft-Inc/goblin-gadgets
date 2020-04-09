import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Container from 'goblin-gadgets/widgets/container/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import WidgetDocMenu from '../widget-doc-menu/widget';
import WidgetDocProperties from '../widget-doc-properties/widget';
import WidgetDocPreview from '../widget-doc-preview/widget';
import widgetList from '../widget-doc/widget-list';
import * as styles from './styles';

/******************************************************************************/

class WidgetDoc extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    const requiredProps = {};
    const defaultProps = {};

    for (const widget of widgetList) {
      const widgetRequiredProps = {};
      const widgetDefaultProps = {};

      for (const propDef of widget.props) {
        if (propDef.required) {
          widgetRequiredProps[propDef.name] = propDef.type.defaultValue;
          widgetDefaultProps[propDef.name] = propDef.type.defaultValue;
        }
      }
      requiredProps[widget.name] = widgetRequiredProps;

      if (widget.scenarios) {
        const scenario = widget.scenarios[0];
        if (scenario) {
          for (const [propName, propValue] of Object.entries(scenario.props)) {
            widgetDefaultProps[propName] = propValue;
          }
        }
      }
      defaultProps[widget.name] = widgetDefaultProps;
    }

    this.dispatch({type: 'INIT', requiredProps, defaultProps});
  }

  renderCloseButton() {
    if (this.props.onClose) {
      return (
        <div className={this.styles.classNames.closeButton}>
          <Button
            width="90px"
            height="90px"
            border="none"
            glyph="solid/times"
            glyphSize="300%"
            onClick={this.props.onClose}
            tooltip="Close"
          />
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    if (!this.props.ready) {
      return null;
    }
    return (
      <Container kind="views">
        <WidgetDocMenu widgetId={this.props.widgetId} />
        <WidgetDocProperties widgetId={this.props.widgetId} />
        <WidgetDocPreview widgetId={this.props.widgetId} />
        {this.renderCloseButton()}
      </Container>
    );
  }
}

export default Widget.connectWidget((state) => {
  return {
    ready: state !== undefined,
  };
})(WidgetDoc);

/******************************************************************************/
