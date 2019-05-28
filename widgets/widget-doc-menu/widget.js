import React from 'react';
import Widget from 'laboratory/widget';
import widgetList from '../widget-doc/widget-list';
import Container from 'goblin-gadgets/widgets/container/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import Button from 'goblin-gadgets/widgets/button/widget';

/******************************************************************************/

const WidgetListItem = Widget.connectWidget((state, props) => {
  return {
    glyph:
      props.text === state.get('selectedWidget')
        ? 'solid/chevron-right'
        : 'solid/none',
  };
})(Button);

/******************************************************************************/

export default class WidgetDocMenu extends Widget {
  setSelectedWidget(name) {
    this.dispatch({type: 'SET_SELECTED_WIDGET', name});
  }

  renderWidgetListItem(widget) {
    return (
      <WidgetListItem
        widgetId={this.props.widgetId}
        key={widget.name}
        text={widget.name}
        kind="menu-item"
        glyphPosition="right"
        justify="between"
        textTransform="none"
        onClick={() => this.setSelectedWidget(widget.name)}
      />
    );
  }

  render() {
    return (
      <Container
        kind="view"
        spacing="large"
        backgroundColor={this.context.theme.palette.footerBackground}
      >
        <Container kind="pane-header">
          <Label text="Widgets" kind="pane-header" />
        </Container>
        <Container kind="panes">
          {widgetList.map(widget => this.renderWidgetListItem(widget))}
        </Container>
      </Container>
    );
  }
}

/******************************************************************************/
