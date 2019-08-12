import React from 'react';
import Props from './props';
import Widget from 'goblin-laboratory/widgets/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';

export default class ChatBalloon extends Widget {
  renderDatetime() {
    return (
      <div className={this.styles.classNames.dateTime}>
        <Label text={this.props.dateTime} />
      </div>
    );
  }

  renderMessage() {
    return (
      <div className={this.styles.classNames.boxBalloon}>
        <div className={this.styles.classNames.balloon}>
          <div className={this.styles.classNames.triangle} />
          <div className={this.styles.classNames.message}>
            <Label kind="compact" text={this.props.message} />
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
