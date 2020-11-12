import React from 'react';
import props from './props';
import scenarios from './scenarios';
import {registerWidget} from 'goblin-gadgets/widgets/widget-doc/widget-list';
import Widget from 'goblin-laboratory/widgets/widget';
import * as styles from './styles';

/******************************************************************************/

export default class LauncherBlob extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
  }

  renderWave() {
    return (
      <div className={this.styles.classNames.launcherWave}>
        <svg viewBox="0 0 297 210">
          <path d="m0 210v-193.73c9.3034-14.98 15.525 4.7222 24.27 2.348 17.858-4.8479 20.398 5.8404 30.544 7.4498 5.5989 0.88814 9.7774-12.815 15.338-11.431 8.4981 2.1156 13.814 22.049 22.378 20.82 12.034-1.7266 19.69-30.949 31.682-28.577 9.8009 1.9386 8.3159 34.223 17.852 38.375 7.1212 3.1 9.5798-21.247 16.847-23.27 11.94-3.3232 24.46 14.771 35.956 8.5731 12.783-6.8916 9.6811-27.649 23.133-26.536 10.218 0.84531 6.5631 24.928 16.344 29.802 12.961 6.4577 24.451-21.982 37.968-23.678 5.8495-0.73408 8.3206 15.336 14.081 17.146 3.9539 1.2422 4.8245-13.071 10.608-9.3896v192.09z" />
        </svg>
      </div>
    );
  }

  // See https://css-tricks.com/blobs/
  renderBlob() {
    return (
      <div className={this.styles.classNames.launcherBlob}>
        <svg viewBox="0 0 310 350">
          <path d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111 c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z" />
        </svg>
      </div>
    );
  }

  render() {
    if (this.props.kind === 'wave') {
      return this.renderWave();
    } else if (this.props.kind === 'blob') {
      return this.renderBlob();
    } else {
      return null;
    }
  }
}

/******************************************************************************/

registerWidget(LauncherBlob, props, scenarios);
