export default function styles() {
  const filter = {
    minHeight: '34px',
    maxHeight: '34px',
    margin: '0px 20px 20px 20px',
    display: 'flex',
    flexDirection: 'row',
  };

  const scenarios = {
    minHeight: '34px',
    margin: '0px 20px 20px 20px',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
  };

  const scenarioButtons = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  };

  const empty = {
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return {
    filter,
    scenarios,
    scenarioButtons,
    empty,
  };
}

/******************************************************************************/
