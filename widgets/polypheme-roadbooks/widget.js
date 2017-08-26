import React from 'react';
import Widget from 'laboratory/widget';

import Container from 'gadgets/container/widget';
import PolyphemeRoadbook from 'gadgets/polypheme-roadbook/widget';

/******************************************************************************/

class PolyphemeRoadbooks extends Widget {
  constructor () {
    super (...arguments);
  }

  renderRoadbook (roadbook, index) {
    return <PolyphemeRoadbook key={index} data={roadbook} />;
  }

  renderRoadbooks () {
    const result = [];
    let index = 0;
    for (const id in this.props.data.Messengers) {
      const roadbook = this.props.data.Messengers[id];
      result.push (this.renderRoadbook (roadbook, index++));
    }
    return result;
  }

  render () {
    return (
      <Container
        kind="tickets-messengers"
        dragController="roadbook"
        dragSource="roadbooks"
        dragOwnerId={this.props.data.id}
      >
        {this.renderRoadbooks ()}
      </Container>
    );
  }
}

/******************************************************************************/
export default PolyphemeRoadbooks;
