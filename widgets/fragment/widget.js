import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import withC from 'goblin-laboratory/widgets/connect-helpers/with-c';

/******************************************************************************/

let Fragment = class Fragment extends Widget {
  constructor() {
    super(...arguments);
  }

  render() {
    if (this.props.show === false) {
      return null;
    }
    return <>{this.props.children}</>;
  }
};

/******************************************************************************/

Fragment = withC(Fragment);

Fragment.displayName = 'Fragment';

export default Fragment;
