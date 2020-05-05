/******************************************************************************/

export const propNames = ['grow', 'width', 'height', 'layout'];

export default function styles(theme, props) {
  const {grow, width, height, layout = 'horizontal'} = props;
  const horizontal = layout === 'horizontal';

  const tips = {
    flexGrow: grow,
    width: width,
    height: height,
    display: 'flex',
    flexDirection: 'row',
  };

  const tip = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  };

  const buttons = {
    marginLeft: '10px',
    display: 'flex',
    flexDirection: horizontal ? 'row' : 'column',
  };

  return {
    tips,
    tip,
    buttons,
  };
}

/******************************************************************************/
