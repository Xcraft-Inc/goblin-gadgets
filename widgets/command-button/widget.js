import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Button from 'goblin-gadgets/widgets/button/widget';

class CommandButton extends Widget {
  constructor() {
    super(...arguments);
  }

  render() {
    const {command, showDisabled, ...others} = this.props;
    if (
      process &&
      process.env &&
      process.env.NODE_ENV === 'development' &&
      !this.registry[command]
    ) {
      //show the bad command in UI as a disabled button
      return <Button {...others} disabled={true} text={command} />;
    }

    if (!this.canDo(command)) {
      if (showDisabled) {
        return <Button {...others} disabled={true} />;
      } else {
        return null;
      }
    }
    return <Button {...others} />;
  }
}

export default Widget.connect((state) => {
  const clientSessionId = state.get(`backend.${window.labId}.clientSessionId`);
  const rank = state.get(`backend.login-session@${clientSessionId}.rank`);
  return {
    rank,
  };
})(CommandButton);
