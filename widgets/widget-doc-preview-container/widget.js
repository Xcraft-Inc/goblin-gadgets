import React from 'react';
import Widget from 'laboratory/widget';
import Container from 'goblin-gadgets/widgets/container/widget';

/******************************************************************************/

class WidgetDocPreviewContainer extends Widget {
  constructor() {
    super(...arguments);
  }

  render() {
    const {layout} = this.props;
    return (
      <div className={this.styles.classNames.previewContainer}>
        <Container kind={layout}>{this.props.children}</Container>
      </div>
    );
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
