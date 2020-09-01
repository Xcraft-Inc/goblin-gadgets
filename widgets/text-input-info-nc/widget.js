import React from 'react';
import props from './props';
import {registerWidget} from 'goblin-gadgets/widgets/widget-doc/widget-list';
import Widget from 'goblin-laboratory/widgets/widget';
import TextInputNC from '../text-input-nc/widget';
import FlyingBalloon from 'goblin-gadgets/widgets/flying-balloon/widget';

/******************************************************************************/

export default class TextInputInfoNC extends Widget {
  renderFlyingBalloon() {
    let warning = this.props.warning;
    let info = this.props.info;

    if (this.props.check) {
      const checkProps = this.props.check(this.props.value);
      if (checkProps) {
        warning = checkProps.warning;
        info = checkProps.info;
      }
    }

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
    return (
      <TextInputNC {...this.props}>{this.renderFlyingBalloon()}</TextInputNC>
    );
  }
}

/******************************************************************************/

registerWidget(TextInputInfoNC, props, null, false);
