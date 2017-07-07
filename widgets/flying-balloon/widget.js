import React from 'react';
import Widget from 'laboratory/widget';

import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';

/******************************************************************************/

class FlyingBalloon extends Widget {
  constructor (props) {
    super (props);
  }

  render () {
    const disabled = this.props.disabled;
    const inputPrimaryText = this.props['primary-text'];
    const inputSecondaryText = this.props['secondary-text'];
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
