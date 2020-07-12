import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import ResizableContainer from 'goblin-gadgets/widgets/resizable-container/widget';
import Frame from 'goblin-laboratory/widgets/frame/widget';
import * as styles from './styles';
import {Unit} from 'goblin-theme';
const px = Unit.toPx;

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
        style.minWidth = px(width);
        style.maxWidth = px(width);
      }
      if (height) {
        style.minHeight = px(height);
        style.maxHeight = px(height);
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

  renderThemeContext(theme, themeContext) {
    if (theme && theme !== 'none') {
      return (
        <Frame
          labId={this.context.labId}
          store={this.context.store}
          desktopId={this.context.desktopId}
          themeContext={themeContext}
          currentTheme={theme}
        >
          {this.renderContainer()}
        </Frame>
      );
    }
    return this.renderContainer();
  }

  render() {
    return (
      <div className={this.styles.classNames.widgetDocPreviewContainer}>
        {this.renderThemeContext(this.props.theme, this.props.themeContext)}
      </div>
    );
  }
}

/******************************************************************************/

export default Widget.connectWidget((state) => {
  const settings = state.get('settings');
  return {
    theme: settings.get('theme'),
    themeContext: settings.get('themeContext'),
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
