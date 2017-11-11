import React from 'react';
import Widget from 'laboratory/widget';

import Container from 'gadgets/container/widget';
import Splitter from 'gadgets/splitter/widget';
import Hinter from 'gadgets/hinter/widget';

/******************************************************************************/

class HinterColumn extends Widget {
  constructor () {
    super (...arguments);
  }

  renderListWithSplitter () {
    return (
      <Splitter kind="vertical" firstSize="90%">
        <Hinter {...this.props} />
        <Container kind="row" />
      </Splitter>
    );
  }

  renderList () {
    return <Hinter {...this.props} />;
  }

  renderDate () {
    return (
      <Container kind="row">
        <Hinter {...this.props} />
      </Container>
    );
  }

  render () {
    switch (this.props.kind) {
      case 'list':
        return this.renderList ();
      case 'date':
        return this.renderDate ();
      default:
        return null;
    }
  }
}

/******************************************************************************/
export default HinterColumn;
