import React from 'react';
import Widget from 'laboratory/widget';
import {Unit} from 'electrum-theme';

import Splitter from 'gadgets/splitter/widget';
import Container from 'gadgets/container/widget';
import PolyphemeBacklog from 'gadgets/polypheme-backlog/widget';
import PolyphemeRoadbooks from 'gadgets/polypheme-roadbooks/widget';
import PolyphemeDesk from 'gadgets/polypheme-desk/widget';

/******************************************************************************/

class PolyphemeDispo extends Widget {
  constructor () {
    super (...arguments);
  }

  renderTop () {
    return (
      <Container kind="tickets-root">
        <PolyphemeRoadbooks data={this.props.data.Roadbooks} />
      </Container>
    );
  }

  renderBottom () {
    return (
      <Splitter kind="vertical" firstSize="800px" firstMaxSize="1200px">
        <Container kind="view-stretch">
          <PolyphemeBacklog data={this.props.data.Backlog} />
        </Container>
        <Container kind="tickets-desk">
          <PolyphemeDesk data={this.props.data.Desk} />
        </Container>
      </Splitter>
    );
  }

  renderSplitter () {
    return (
      <Splitter kind="horizontal" firstSize="60%">
        {this.renderTop ()}
        {this.renderBottom ()}
      </Splitter>
    );
  }

  render () {
    return (
      <Container kind="views">
        {this.renderSplitter ()}
      </Container>
    );
  }
}

/******************************************************************************/
export default PolyphemeDispo;
