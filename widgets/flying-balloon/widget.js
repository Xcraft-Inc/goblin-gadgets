import {React} from 'electrum';
import Widget from 'laboratory/widget';

import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';

/******************************************************************************/

class FlyingBalloon extends Widget {
  constructor (props) {
    super (props);
  }

  widget () {
    return props => {
      const {state} = this.props;
      const disabled = this.read ('disabled');
      const inputPrimaryText = this.read ('primary-text');
      const inputSecondaryText = this.read ('secondary-text');
      const inputTrianglePosition = this.read ('triangle-position');

      const boxStyle = this.styles.box;

      let primaryBottomSpacing = null;
      if (inputPrimaryText) {
        primaryBottomSpacing = 'large';
      }

      return (
        <span disabled={disabled} style={boxStyle}>
          <Container
            kind="flying-balloon"
            triangle-position={inputTrianglePosition}
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
    };
  }
}

/******************************************************************************/
