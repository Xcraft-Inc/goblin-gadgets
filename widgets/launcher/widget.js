import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import LauncherBlob from 'goblin-gadgets/widgets/launcher-blob/widget';
import Rocket from 'goblin-gadgets/widgets/rocket/widget';

/******************************************************************************/

export default class Launcher extends Widget {
  constructor() {
    super(...arguments);
  }

  /******************************************************************************/

  renderRocket(rocket, index) {
    return (
      <Rocket key={index} size="200px" look={this.props.look} {...rocket} />
    );
  }

  renderRockets() {
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
          kind="wave"
          look={this.props.look}
          color="rgba(255,255,255,0.08)"
          duration="30s"
        />
        {this.renderRockets()}
      </div>
    );
  }
}

/******************************************************************************/
