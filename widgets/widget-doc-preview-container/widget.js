import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Container from 'goblin-gadgets/widgets/container/widget';
import ThemeContext from 'goblin-laboratory/widgets/theme-context/widget';
import * as styles from './styles';

/******************************************************************************/

class WidgetDocPreviewContainer extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  renderThemeContext(theme) {
    if (theme && theme !== 'none') {
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
    let ContainerComponent = 'div';
    let containerProps = {};
    if (layout[0] !== 'div') {
      ContainerComponent = Container;
      containerProps.kind = layout[0];
      if (layout[1] === 'grow') {
        containerProps.grow = '1';
      }
    } else {
      if (layout[1] === 'grow') {
        containerProps.className = this.styles.classNames.grow;
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

export default Widget.connectWidget((state) => {
  const settings = state.get('settings');
  return {
    theme: settings.get('theme'),
    frame: settings.get('frame'),
    layoutFrame: settings.get('layoutFrame'),
    scale: settings.get('scale'),
    color: settings.get('color'),
    layout: settings.get('layout'),
  };
})(WidgetDocPreviewContainer);

/******************************************************************************/
