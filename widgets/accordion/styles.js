/******************************************************************************/

export const propNames = ['transition', 'hasOverflow'];

export default function styles(theme, props) {
  const {transition, hasOverflow} = props;

  const accordion = {
    overflowY: hasOverflow === false ? null : 'hidden',
    transition: transition,
  };

  return {accordion};
}

/******************************************************************************/
