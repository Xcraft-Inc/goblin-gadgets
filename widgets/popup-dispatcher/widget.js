import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import PopupContainer from 'goblin-gadgets/widgets/popup-container/widget';

/******************************************************************************/

function getAttachPoint(rect, shift, mode) {
  let x, y;

  switch (mode.x) {
    case 'left':
      x = rect.get('left');
      break;
    case 'right':
      x = rect.get('right');
      break;
    case 'center':
      x = (rect.get('left') + rect.get('right')) / 2;
      break;
  }

  switch (mode.y) {
    case 'top':
      y = rect.get('top');
      break;
    case 'bottom':
      y = rect.get('bottom');
      break;
    case 'center':
      y = (rect.gett('top') + rect.get('bottom')) / 2;
      break;
  }

  x += shift.x;
  y += shift.y;

  return {x, y};
}

/******************************************************************************/

class PopupDispatcher extends Widget {
  constructor() {
    super(...arguments);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(item) {
    this.doFor('popup-dispatcher', 'hide', {popup: item.popup});
  }
  /******************************************************************************/

  renderPopup(item, index) {
    const {id, popup, params} = this.props;

    const show = popup === item.popup;

    if (params?.get('parentRect') && item.attachMode) {
      item.attachPoint = getAttachPoint(
        params.get('parentRect'),
        item.attachShift,
        item.attachMode
      );
    }

    return (
      <PopupContainer
        key={index}
        visibility={show ? 'show' : 'hidden'}
        size={item.size}
        origin={item.origin}
        attach={item.attach}
        width={item.width}
        height={item.height}
        heightStrategy={item.heightStrategy}
        marginTopBottom={item.marginTopBottom}
        screenBackground={item.screenBackground}
        attachPoint={item.attachPoint}
        triangle={item.triangle}
        triangleSize="16px"
        transitionScope={item.transitionScope}
        enableBackgroundClickForCancel={item.enableBackgroundClickForCancel}
        onClose={() => this.handleClose(item)}
      >
        {item.render({id, popup, params})}
      </PopupContainer>
    );
  }

  render() {
    return this.props.popups.map((item, index) =>
      this.renderPopup(item, index)
    );
  }
}

/******************************************************************************/

export default Widget.connect((state, props) => {
  const serviceState = state.get(`backend.${props.id}`);
  if (!serviceState) {
    return {};
  }

  const popup = serviceState.get('popup');
  const params = serviceState.get('params');

  return {
    popup,
    params,
  };
})(PopupDispatcher);
