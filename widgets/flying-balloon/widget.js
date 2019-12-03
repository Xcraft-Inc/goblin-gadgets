//T:2019-02-27
import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';

import Container from 'goblin-gadgets/widgets/container/widget';
import Label from 'goblin-gadgets/widgets/label/widget';

/******************************************************************************/

class FlyingBalloon extends Widget {
  constructor() {
    super(...arguments);
  }

  render() {
    const boxClass = `flying-balloon ${this.styles.classNames.box}`;
    const primaryBottomSpacing =
      this.props.primaryText && this.props.secondaryText ? 'large' : null;

    return (
      <span disabled={this.props.disabled} className={boxClass}>
        <Container
          kind="flying-balloon"
          subkind={this.props.primaryText ? 'warning' : null}
          trianglePosition={this.props.trianglePosition}
        >
          <Label
            text={this.props.primaryText}
            kind="flying-balloon"
            fontWeight="bold"
            bottomSpacing={primaryBottomSpacing}
          />
          <Label text={this.props.secondaryText} kind="flying-balloon" />
        </Container>
      </span>
    );
  }
}

/******************************************************************************/
export default FlyingBalloon;
