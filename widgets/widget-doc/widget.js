import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Container from 'goblin-gadgets/widgets/container/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import WidgetDocMenu from '../widget-doc-menu/widget';
import WidgetDocProperties from '../widget-doc-properties/widget';
import WidgetDocPreview from '../widget-doc-preview/widget';
import widgetList from '../widget-doc/widget-list';
import * as styles from './styles';
import {UnionType} from 'xcraft-core-stones';

/******************************************************************************/

class WidgetDoc extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    const requiredProps = {};
    const defaultProps = {};
    const selectedTypeProps = {};

    for (const widget of widgetList) {
      const widgetRequiredProps = {};
      const widgetDefaultProps = {};
      const widgetSelectedTypeProps = {};

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
            let value = propValue;

            const propDef = widget.props.find(({name}) => name === propName);
            if (!propDef) {
              throw new Error(
                `Bad prop '${propName}' in scenarios.js of '${widget.name}'`
              );
            }

            const samplesData = propDef.type.samplesData;
            if (samplesData && propValue in samplesData) {
              value = samplesData[propValue];
            }

            widgetDefaultProps[propName] = value;

            const type = propDef.type.type;
            if (type instanceof UnionType) {
              const subType = type.findType(value);
              if (!subType) {
                throw new Error(
                  `Bad type for prop '${propName}' in scenarios.js of '${widget.name}'`
                );
              }
              widgetSelectedTypeProps[propName] = subType.name;
            }
          }
        }
      }
      defaultProps[widget.name] = widgetDefaultProps;
    }

    this.dispatch({
      type: 'INIT',
      requiredProps,
      defaultProps,
      selectedTypeProps,
    });
  }

  renderCloseButton() {
    if (this.props.onClose) {
      return (
        <div className={this.styles.classNames.closeButton}>
          <Button
            width="50px"
            height="50px"
            border="none"
            glyph="solid/times"
            glyphSize="200%"
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

/******************************************************************************/

export default Widget.connectWidget((state) => {
  return {
    ready: state !== undefined,
  };
})(WidgetDoc);
