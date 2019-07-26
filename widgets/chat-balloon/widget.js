import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Label from 'goblin-gadgets/widgets/label/widget';

export default class ChatBalloon extends Widget {
  renderDatetime() {
    return (
      <div className={this.styles.classNames.dateTime}>
        <Label text={this.props.dateTime} />
      </div>
    );
  }

  renderMagnifyingGlass() {
    if (this.props.hasMagnifyingGlass) {
      const icon = ['fal', 'search'];
      return (
        <div
          className={this.styles.classNames.magnifyingGlass}
          onClick={() => this.props.onDocument()}
        >
          <FontAwesomeIcon icon={icon} />
        </div>
      );
    } else {
      return null;
    }
  }

  renderMessage() {
    return (
      <div className={this.styles.classNames.boxBalloon}>
        <div className={this.styles.classNames.balloon}>
          <div className={this.styles.classNames.triangle} />
          <div className={this.styles.classNames.message}>
            <Label text={this.props.message} />
          </div>
          {this.renderMagnifyingGlass()}
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
