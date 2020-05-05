/******************************************************************************/

export const propNames = ['grow', 'width', 'height', 'layout', 'tipsRank'];

export default function styles(theme, props) {
  const {grow, width, height, layout = 'horizontal', tipsRank} = props;
  const horizontal = layout === 'horizontal';
  const showTips = tipsRank !== -1;

  const tips = {
    position: showTips ? null : 'absolute',
    right: showTips ? null : '5px',
    bottom: showTips ? null : '25px',
    flexGrow: grow,
    width: width,
    height: showTips ? height : '0px',
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
