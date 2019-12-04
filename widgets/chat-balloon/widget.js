import React from 'react';
import Props from './props';
import Widget from 'goblin-laboratory/widgets/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';
import * as styles from './styles';

export default class ChatBalloon extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
    
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  renderDatetime() {
    return (
      <div className={this.styles.classNames.dateTime}>
        <Label kind="compact" text={this.props.dateTime} />
      </div>
    );
  }

  renderMessage() {
    return (
      <div className={this.styles.classNames.boxBalloon}>
        <div
          className={this.styles.classNames.balloon}
          onClick={this.handleClick}
        >
          <div className={this.styles.classNames.triangle} />
          <div className={this.styles.classNames.message}>
            <Label kind="compact" text={this.props.message} />
          </div>
          <div className={this.styles.classNames.hover}>
            <Label glyph="solid/search" />
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={this.styles.classNames.chatBalloon}>
        {this.renderDatetime()}
        {this.renderMessage()}
      </div>
    );
  }
}

/******************************************************************************/

ChatBalloon.propTypes = makePropTypes(Props);
ChatBalloon.defaultProps = makeDefaultProps(Props);

/******************************************************************************/
