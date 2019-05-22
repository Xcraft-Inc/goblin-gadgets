import React from 'react';
import Widget from 'laboratory/widget';
import widgetList from '../widget-doc/widget-list';
import Container from 'goblin-gadgets/widgets/container/widget';
import Label from 'goblin-gadgets/widgets/label/widget';

/******************************************************************************/

/******************************************************************************/

class WidgetDocPreview extends Widget {
  constructor() {
    super(...arguments);
  }

  renderCode(widgetName) {
    var code = `<${widgetName} `;
    code += this.props.props
      .map((value, name) => `${name}="${value}" `)
      .join(' ');
    code += '/>';
    return <Label text={code} />;
  }

  renderSettings() {
    return <Label text="settings" />;
  }

  render() {
    const widgetInfo = widgetList.find(
      widget => widget.name === this.props.selectedWidget
    );
    if (!widgetInfo) {
      return null;
    }

    return (
      <React.Fragment>
        <Container kind="pane">
          <Label text="Settings" grow="1" kind="title" />
          {this.renderSettings()}
        </Container>
        <Container kind="pane">
          <Label text="Code" grow="1" kind="title" />
          <Container kind="row-pane">
            {this.renderCode(widgetInfo.name)}
          </Container>
        </Container>
        <Container kind="pane">
          <Label text={widgetInfo.name} grow="1" kind="title" />
          <widgetInfo.widget {...this.props.props.toJS()} />
        </Container>
      </React.Fragment>
    );
  }
}

export default Widget.connectWidget(state => {
  return {
    selectedWidget: state.get('selectedWidget'),
    props: state.get('props'),
  };
})(WidgetDocPreview);

/******************************************************************************/
