import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Container from 'goblin-gadgets/widgets/container/widget';
import ResizableContainer from 'goblin-gadgets/widgets/resizable-container/widget';
import ThemeContext from 'goblin-laboratory/widgets/theme-context/widget';
import * as styles from './styles';

/******************************************************************************/

class WidgetDocPreviewContainer extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  renderContainer() {
    if (this.props.container === 'container') {
      const containerProps = {
        kind:
          this.props.direction === 'row-wrap' ? 'wrap' : this.props.direction,
      };
      return <Container {...containerProps}>{this.props.children}</Container>;
    }

    if (this.props.container === 'resizable') {
      const containerProps = {
        flexGrow: this.props.grow === 'true' ? 1 : null,
        flexDirection: this.props.direction === 'column' ? 'column' : 'row',
        flexWrap: this.props.direction === 'row-wrap' ? 'wrap' : null,
      };
      return (
        <ResizableContainer {...containerProps}>
          {this.props.children}
        </ResizableContainer>
      );
    }

    if (this.props.container === 'div') {
      const style = {
        display: 'flex',
        flexGrow: this.props.grow === 'true' ? 1 : null,
        flexDirection: this.props.direction === 'column' ? 'column' : 'row',
        flexWrap: this.props.direction === 'row-wrap' ? 'wrap' : null,
      };
      return <div style={style}>{this.props.children}</div>;
    }

    return null;
  }

  renderContainer_OLD() {
    const layout = this.props.layout.split('-'); // split 'column-grow' by example
    let ContainerComponent = 'div';
    const containerProps = {};

    if (layout[0] === 'resizable') {
      ContainerComponent = ResizableContainer;
      containerProps.flexDirection = layout[1];
    } else if (layout[0] !== 'div') {
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

  render() {
    return (
      <div className={this.styles.classNames.widgetDocPreviewContainer}>
        {this.renderThemeContext(this.props.theme)}
      </div>
    );
  }
}

/******************************************************************************/

export default Widget.connectWidget((state) => {
  const settings = state.get('settings');
  return {
    theme: settings.get('theme'),
    frame: settings.get('frame'),
    layoutFrame: settings.get('layoutFrame'),
    scale: settings.get('scale'),
    color: settings.get('color'),
    container: settings.get('container'),
    grow: settings.get('grow'),
    direction: settings.get('direction'),
  };
})(WidgetDocPreviewContainer);

/******************************************************************************/
