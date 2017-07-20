import React from 'react';
import Widget from 'laboratory/widget';

import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';

/******************************************************************************/

class FlyingBalloon extends Widget {
  constructor () {
    super (...arguments);
  }

  render () {
    const disabled = this.props.disabled;
    const inputPrimaryText = this.props.primaryText;
    const inputSecondaryText = this.props.secondaryText;
    const inputTrianglePosition = this.props.trianglePosition;

    const boxClass = this.styles.classNames.box;

    let primaryBottomSpacing = null;
    if (inputPrimaryText) {
      primaryBottomSpacing = 'large';
    }

    return (
      <span disabled={disabled} className={boxClass}>
        <Container
          kind="flying-balloon"
          trianglePosition={inputTrianglePosition}
        >

          <Label
            text={inputPrimaryText}
            kind="flying-balloon"
            font-weight="bold"
            bottom-spacing={primaryBottomSpacing}
          />

          <Label text={inputSecondaryText} kind="flying-balloon" />
        </Container>
      </span>
    );
  }
}

/******************************************************************************/
export default FlyingBalloon;
