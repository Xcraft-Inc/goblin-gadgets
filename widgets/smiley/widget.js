import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';
import Label from 'goblin-gadgets/widgets/label/widget';

/******************************************************************************/

export default class Smiley extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  // Display documentation according to xcraft.ch.
  renderDocumentation() {
    if (!this.props.step || this.props.step === 7) {
      return null;
    }

    let text;
    switch (this.props.step) {
      case 1:
        text = 'Simple yellow circle';
        break;
      case 2:
        text = 'Yellow circle with eyes and smile';
        break;
      case 3:
        text = 'Add gradient inside circle';
        break;
      case 4:
        text = 'Adds a reflection behind the eyes';
        break;
      case 5:
        text = 'Adds a reflection at the bottom of the circle';
        break;
      case 6:
        text =
          "Simple circle with the diameter according to the property 'size' ";
        break;
    }

    return (
      <div className={this.styles.classNames.documentation}>
        <Label text={text} />
      </div>
    );
  }

  render() {
    return (
      <div className={this.styles.classNames.smiley}>
        <div className={this.styles.classNames.reflexion1} />
        <div className={this.styles.classNames.reflexion2} />
        <div className={this.styles.classNames.leftEye} />
        <div className={this.styles.classNames.rightEye} />
        <div className={this.styles.classNames.smile}>
          <div className={this.styles.classNames.leftCorner} />
          <div className={this.styles.classNames.rightCorner} />
        </div>
        {this.renderDocumentation()}
      </div>
    );
  }
}

/******************************************************************************/
