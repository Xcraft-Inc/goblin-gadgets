import React from 'react';
import Widget from 'laboratory/widget';
import Container from 'goblin-gadgets/widgets/container/widget';

/******************************************************************************/

class WidgetDocPreviewContainer extends Widget {
  constructor() {
    super(...arguments);
  }

  render() {
    const layout = this.props.layout.split('-');

    if (layout[0] === '') {
      return (
        <div className={this.styles.classNames.previewContainer}>
          <div>{this.props.children}</div>
        </div>
      );
    } else if (layout[0] !== '' && layout[1] === 'grow') {
      return (
        <div className={this.styles.classNames.previewContainer}>
          <Container kind={layout[0]} grow={'1'}>
            {this.props.children}
          </Container>
        </div>
      );
    } else {
      return (
        <div className={this.styles.classNames.previewContainer}>
          <Container kind={layout[0]}>{this.props.children}</Container>
        </div>
      );
    }
  }
}

export default Widget.connectWidget(state => {
  const settings = state.get('settings');
  return {
    frame: settings.get('frame'),
    scale: settings.get('scale'),
    color: settings.get('color'),
    layout: settings.get('layout'),
  };
})(WidgetDocPreviewContainer);

/******************************************************************************/
