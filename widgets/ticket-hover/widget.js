//T:2019-02-27
import React from 'react';
import Widget from 'laboratory/widget';

const Bool = require('gadgets/helpers/bool-helpers');

/******************************************************************************/

export default class TicketHover extends Widget {
  constructor() {
    super(...arguments);
  }

  renderTicket() {
    const w = this.props.width;
    const h = this.props.height;
    return (
      <svg width={w} height={h} className={this.styles.classNames.hover}>
        <path d={this.styles.props.hover.path} />
      </svg>
    );
  }

  renderRect() {
    return <div className={this.styles.classNames.rectHover} />;
  }

  renderSubpane() {
    return null;
  }

  renderCover() {
    return null;
  }

  render() {
    if (Bool.isFalse(this.props.show)) {
      return null;
    }

    if (this.props.kind === 'ticket') {
      return this.renderTicket();
    } else if (this.props.kind === 'cover') {
      return this.renderCover();
    } else if (this.props.kind === 'subpane') {
      return this.renderSubpane();
    } else {
      // 'rect' 'thin' 'event' ... ?
      return this.renderRect();
    }
  }
}
