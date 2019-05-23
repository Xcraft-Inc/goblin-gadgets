import React from 'react';
import Widget from 'laboratory/widget';
import widgetList from '../widget-doc/widget-list';
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
    this.dispatch({type: 'SET', path: 'selectedWidget', value: name});
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
      <div className={this.styles.classNames.container}>
        {widgetList.map(widget => this.renderWidgetListItem(widget))}
      </div>
    );
  }
}

/******************************************************************************/
