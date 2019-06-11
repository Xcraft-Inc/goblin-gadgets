import React from 'react';
import Widget from 'laboratory/widget';
import Container from 'goblin-gadgets/widgets/container/widget';
import ThemeContext from 'laboratory/theme-context/widget';

/******************************************************************************/

class WidgetDocPreviewContainer extends Widget {
  constructor() {
    super(...arguments);
  }

  renderThemeContext(theme) {
    if (theme !== 'none') {
      return (
        <ThemeContext labId={this.context.labId} frameThemeContext={theme}>
          {this.renderContainer()}
        </ThemeContext>
      );
    }
    return this.renderContainer();
  }

  renderContainer() {
    const layout = this.props.layout.split('-');
    let containerProps = {};
    let ContainerComponent = 'div';
    if (layout[0] !== 'div') {
      containerProps.kind = layout[0];
      ContainerComponent = Container;
      if (layout[1] === 'grow') {
        containerProps.grow = '1';
      }
    }
    return (
      <ContainerComponent {...containerProps}>
        {this.props.children}
      </ContainerComponent>
    );
  }

  render() {
    return (
      <div className={this.styles.classNames.previewContainer}>
        {this.renderThemeContext(this.props.theme)}
      </div>
    );
  }
}

export default Widget.connectWidget(state => {
  const settings = state.get('settings');
  return {
    theme: settings.get('theme'),
    frame: settings.get('frame'),
    scale: settings.get('scale'),
    color: settings.get('color'),
    layout: settings.get('layout'),
  };
})(WidgetDocPreviewContainer);

/******************************************************************************/
