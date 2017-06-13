import React from 'react';
import Widget from 'laboratory/widget';

import Button from 'gadgets/button/widget';

/******************************************************************************/

class CheckButton extends Widget {
  constructor (props) {
    super (props);
  }

  onButtonClicked (e) {
    const x = this.read ('on-click');
    if (x) {
      x (e);
    } else {
      this.onClick (e);
    }
  }

  widget () {
    return props => {
      const kind = this.read ('kind');
      const text = this.read ('text');
      const checked = this.read ('checked');
      const spacing = this.read ('spacing');

      let glyph;
      if (kind === 'switch') {
        glyph = checked === 'true' ? 'toggle-on' : 'toggle-off'; // [ o] [x ]
      } else if (kind === 'radio') {
        glyph = checked === 'true' ? 'stop-circle-o' : 'circle-o'; // o
      } else {
        glyph = checked === 'true' ? 'check-square' : 'square-o'; // [v] [ ]
      }

      return  (
        <Button
          on-click={::this.onButtonClicked}
          glyph={glyph}
          text={text}
          border="none"
          spacing={spacing}
        />
      );
    };
  }
}

/******************************************************************************/
