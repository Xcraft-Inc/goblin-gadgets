import React from 'react';
import Widget from 'laboratory/widget';

import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';

/******************************************************************************/

class FlyingBalloon extends Widget {
  constructor () {
    super (...arguments);
  }

  renderWarning () {
    if (this.props.primaryText) {
      return <Label glyph="warning" glyphColor="secondary" glyphSize="200%" />;
    } else {
      return null;
    }
  }

  render () {
    const boxClass = this.styles.classNames.box;
    const primaryBottomSpacing = this.props.primaryText &&
      this.props.secondaryText
      ? 'large'
      : null;

    return (
      <span disabled={this.props.disabled} className={boxClass}>
        <Container
          kind="flying-balloon"
          trianglePosition={this.props.trianglePosition}
        >
          {this.renderWarning ()}
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
