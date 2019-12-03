//T:2019-02-27

import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import Container from 'goblin-gadgets/widgets/container/widget';
import Label from 'goblin-gadgets/widgets/label/widget';

const LabelWired = Widget.connect((state, props) => {
  return {text: state.get(props.fullpath)};
})(Label);

export default function ReadonlyLabel(props) {
  const labelWidth = props.labelWidth || props.defaultLabelWidth;

  return (
    <Container
      kind="row-field"
      grow={props.grow}
      width={props.width}
      height={props.height}
      verticalSpacing={props.verticalSpacing || 'compact'}
      verticalJustify={props.verticalJustify}
    >
      {labelWidth === '0px' ? null : (
        <Label
          text={props.labelText}
          glyph={props.labelGlyph}
          width={labelWidth}
          kind="label-field"
          justify="left"
          horizontalSpacing="overlap"
        />
      )}
      <LabelWired grow="1" justify={props.justify} fullpath={props.fullpath} />
    </Container>
  );
}
