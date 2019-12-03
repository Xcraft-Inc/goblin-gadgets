//T:2019-02-27
import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';

import Container from 'goblin-gadgets/widgets/container/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import Separator from 'goblin-gadgets/widgets/separator/widget';

/******************************************************************************/

class ChatDialog extends Widget {
  constructor() {
    super(...arguments);
  }

  renderMessage(message, index) {
    if (message.state === 'title') {
      return (
        <div key={index}>
          <Separator kind="space" />
          <Label text={message.message} />
          <Separator kind="space" />
        </div>
      );
    } else {
      const triangle = message.state === 'me' ? 'right' : 'left';
      return (
        <Container
          key={index}
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

  renderMessages(messages) {
    const result = [];
    let index = 0;
    for (const message of messages) {
      result.push(this.renderMessage(message, index++));
    }
    return result;
  }

  render() {
    const boxClass = this.styles.classNames.box;

    return (
      <div className={boxClass}>{this.renderMessages(this.props.data)}</div>
    );
  }
}

/******************************************************************************/
export default ChatDialog;
