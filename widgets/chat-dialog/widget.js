import React from 'react';
import Widget from 'laboratory/widget';

import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import Separator from 'gadgets/separator/widget';

/******************************************************************************/

class ChatDialog extends Widget {
  constructor () {
    super (...arguments);
  }

  renderMessage (message) {
    if (message.state === 'title') {
      return (
        <div>
          <Separator kind="space" />
          <Label text={message.message} />
          <Separator kind="space" />
        </div>
      );
    } else {
      const triangle = message.state === 'me' ? 'right' : 'left';
      return (
        <Container
          kind="flying-chat"
          subkind={message.state}
          trianglePosition={triangle}
        >
          <Label text={message.user} kind="title" />
          <Label text={message.message} />
        </Container>
      );
    }
  }

  renderMessages (messages) {
    const result = [];
    for (const message of messages) {
      result.push (this.renderMessage (message));
    }
    return result;
  }

  render () {
    const boxClass = this.styles.classNames.box;

    return (
      <div className={boxClass}>
        {this.renderMessages (this.props.data)}
      </div>
    );
  }
}

/******************************************************************************/
export default ChatDialog;
