//T:2019-02-27
import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';

import Container from 'goblin-gadgets/widgets/container/widget';
import Splitter from 'goblin-gadgets/widgets/splitter/widget';
import Hinter from 'goblin-gadgets/widgets/hinter/widget';

/******************************************************************************/

export default class HinterColumn extends Widget {
  constructor() {
    super(...arguments);
  }

  renderListWithSplitter() {
    return (
      <Splitter kind="vertical" firstSize="90%">
        <Hinter {...this.props} />
        <Container kind="row" />
      </Splitter>
    );
  }

  renderList() {
    return <Hinter {...this.props} />;
  }

  renderDate() {
    return (
      <Container kind="row">
        <Hinter {...this.props} />
      </Container>
    );
  }

  render() {
    switch (this.props.kind) {
      case 'list':
        return this.renderList();
      case 'date':
        return this.renderDate();
      default:
        return null;
    }
  }
}

/******************************************************************************/
