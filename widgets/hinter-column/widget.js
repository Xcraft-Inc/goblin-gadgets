import React from 'react';
import Widget from 'laboratory/widget';

import Container from 'gadgets/container/widget';
import Splitter from 'gadgets/splitter/widget';
import Hinter from 'gadgets/hinter/widget';

/******************************************************************************/

class HinterColumn extends Widget {
  constructor (props) {
    super (props);
  }

  renderHide () {
    return <Container kind="row" grow="1" />;
  }

  renderList () {
    return (
      <Container kind="row" grow="1">
        <Splitter kind="vertical" first-size="90%">
          <Hinter {...this.props} />
          <Container kind="row" />
        </Splitter>
      </Container>
    );
  }

  renderDate () {
    return (
      <Container kind="row" grow="1">
        <Container kind="row">
          <Hinter {...this.props} />
        </Container>
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
        return this.renderHide ();
    }
  }
}

/******************************************************************************/
export default HinterColumn;
