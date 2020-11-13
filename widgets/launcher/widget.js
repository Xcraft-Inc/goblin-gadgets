import React from 'react';
import props from './props';
import scenarios from './scenarios';
import {registerWidget} from 'goblin-gadgets/widgets/widget-doc/widget-list';
import Widget from 'goblin-laboratory/widgets/widget';
import LauncherBlob from 'goblin-gadgets/widgets/launcher-blob/widget';
import Rocket from 'goblin-gadgets/widgets/rocket/widget';
import * as styles from './styles';

/******************************************************************************/

export default class Launcher extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  /******************************************************************************/

  renderRocket(rocket, index) {
    return (
      <Rocket
        key={index}
        size={this.props.rocketSize || '200px'}
        onClick={() => this.props.onLaunchRocket(rocket.id)}
        {...rocket}
      />
    );
  }

  renderRockets() {
    if (!this.props.rockets) {
      return null;
    }

    let index = 0;
    return (
      <div className={this.styles.classNames.rockets}>
        {this.props.rockets.map((rocket) => this.renderRocket(rocket, index++))}
      </div>
    );
  }

  render() {
    return (
      <div className={this.styles.classNames.launcher}>
        <LauncherBlob
          kind={this.props.blobKind}
          color={this.props.blobColor}
          duration="30s"
        />
        {this.renderRockets()}
      </div>
    );
  }
}

/******************************************************************************/

registerWidget(Launcher, props, scenarios);
