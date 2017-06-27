import React from 'react';
import Widget from 'laboratory/widget';

import Container from 'gadgets/container/widget';
import Label from 'gadgets/label/widget';
import Button from 'gadgets/button/widget';

/******************************************************************************/

class Hinter extends Widget {
  constructor (props) {
    super (props);
  }

  renderRow (row) {
    return (
      <Container kind="row-pane" subkind="large-box">
        <Button kind="container" width="100%">
          <Label text={row} kind="large-single" justify="left" grow="1" />
        </Button>
      </Container>
    );
  }

  renderRows (rows) {
    const result = [];
    for (const row of rows) {
      result.push (this.renderRow (row));
    }
    return result;
  }

  render () {
    const {state} = this.props;
    const disabled = this.props.disabled;
    const titleGlyph = this.props['title-glyph'];
    const titleText = this.props['title-text'];
    const rows = this.props.rows;

    return (
      <Container kind="view-short">
        <Container kind="panes-short">
          <Container kind="pane">
            <Container kind="row-pane">
              <Label glyph={titleGlyph} text={titleText} kind="title" />
            </Container>
            {this.renderRows (rows)}
          </Container>
        </Container>
      </Container>
    );
  }
}

/******************************************************************************/
export default Hinter;
