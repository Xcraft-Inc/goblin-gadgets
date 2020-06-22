import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import widgetList from '../widget-doc/widget-list';
import Container from 'goblin-gadgets/widgets/container/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import * as styles from './styles';

/******************************************************************************/

function compareStrings(s1, s2) {
  if (s1 < s2) {
    return -1;
  }
  if (s1 > s2) {
    return 1;
  }
  return 0;
}

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
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

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
        horizontalSpacing="large"
        backgroundColor={this.context.theme.palette.footerBackground}
      >
        <Container kind="pane-header">
          <Label text="Widgets" kind="pane-header" />
        </Container>
        <Container kind="panes">
          {widgetList
            .sort((w1, w2) => compareStrings(w1.name, w2.name))
            .map((widget) => this.renderWidgetListItem(widget))}
        </Container>
      </Container>
    );
  }
}

/******************************************************************************/
