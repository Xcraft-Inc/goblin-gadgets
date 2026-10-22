import React from 'react';
import props from './props';
import {registerWidget} from 'goblin-gadgets/widgets/widget-doc/widget-list';
import Widget from 'goblin-laboratory/widgets/widget';
import TextInputNC from '../text-input-nc/widget';
import FlyingBalloon from 'goblin-gadgets/widgets/flying-balloon/widget';

/******************************************************************************/

export default class TextInputInfoNC extends Widget {
  getCheckProps() {
    if (this.props.check) {
      return this.props.check(this.props.value) || {};
    }
    return {};
  }

  renderFlyingBalloon(checkProps) {
    const warning = Object.prototype.hasOwnProperty.call(checkProps, 'warning')
      ? checkProps.warning
      : this.props.warning;
    const info = Object.prototype.hasOwnProperty.call(checkProps, 'info')
      ? checkProps.info
      : this.props.info;

    if (warning || info) {
      const trianglePosition = {
        bottom: 'top',
        top: 'bottom',
        left: 'right',
        right: 'left',
        undefined: 'top',
      }[this.props.flyingBalloonAnchor];

      return (
        <FlyingBalloon
          width="150%"
          maxWidth="500px"
          primaryText={warning}
          secondaryText={info}
          trianglePosition={trianglePosition}
        />
      );
    } else {
      return null;
    }
  }

  render() {
    const checkProps = this.getCheckProps();
    return (
      <TextInputNC {...this.props} wrong={this.props.wrong || checkProps.wrong}>
        {this.renderFlyingBalloon(checkProps)}
      </TextInputNC>
    );
  }
}

/******************************************************************************/

registerWidget(TextInputInfoNC, props, null, false);
