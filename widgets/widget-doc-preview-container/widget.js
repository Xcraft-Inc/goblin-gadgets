import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import ResizableContainer from 'goblin-gadgets/widgets/resizable-container/widget';
import ThemeContext from 'goblin-laboratory/widgets/theme-context/widget';
import * as styles from './styles';

/******************************************************************************/

class WidgetDocPreviewContainer extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
    this.onChange = this.onChange.bind(this);
  }

  onChange(dx, dy) {
    this.dispatch({
      type: 'SET',
      path: 'settings.containerWidth',
      value: dx,
    });
    this.dispatch({
      type: 'SET',
      path: 'settings.containerHeight',
      value: dy,
    });
  }

  /******************************************************************************/

  renderContainer() {
    const style = {
      display: 'flex',
      flexGrow: this.props.flexGrow,
      flexDirection: this.props.flexDirection,
      flexWrap: this.props.flexWrap,
      overflow: this.props.overflow,
    };

    const width =
      this.props.containerWidth === 'unset' ||
      this.props.containerWidth === 'other'
        ? null
        : this.props.containerWidth;

    const height =
      this.props.containerHeight === 'unset' ||
      this.props.containerHeight === 'other'
        ? null
        : this.props.containerHeight;

    if (this.props.container === 'div') {
      if (width) {
        style.minWidth = width + 'px';
        style.maxWidth = width + 'px';
      }
      if (height) {
        style.minHeight = height + 'px';
        style.maxHeight = height + 'px';
      }
      return <div style={style}>{this.props.children}</div>;
    }

    if (this.props.container === 'resizable') {
      return (
        <ResizableContainer
          style={style}
          dx={width}
          dy={height}
          onChange={this.onChange}
        >
          {this.props.children}
        </ResizableContainer>
      );
    }

    return null;
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
    containerWidth: settings.get('containerWidth'),
    containerHeight: settings.get('containerHeight'),
    flexGrow: settings.get('flexGrow'),
    flexDirection: settings.get('flexDirection'),
    flexWrap: settings.get('flexWrap'),
    overflow: settings.get('overflow'),
  };
})(WidgetDocPreviewContainer);

/******************************************************************************/
