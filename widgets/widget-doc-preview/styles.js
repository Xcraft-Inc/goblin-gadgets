import {Unit} from 'goblin-theme';

export default function styles(theme) {
  const m = theme.shapes.containerMargin;
  const d = Unit.multiply(m, 0.5);

  const container = {
    margin: '10px 0px',
    display: 'flex',
    flexDirection: 'column',
  };

  const code = {
    margin: '5px 0px',
    whiteSpace: 'normal',
    userSelect: 'text',
  };

  const settings = {
    margin: '10px 0px',
  };

  const panes = {
    overflow: 'hidden',
    padding: `0px ${m}`,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  };

  const paneCode = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginBottom: m,
    padding: m,
    backgroundColor: theme.palette.paneBackground,
  };

  const paneSettings = {
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginBottom: m,
    padding: `${m} ${m} ${d} ${m}`,
    backgroundColor: theme.palette.paneBackground,
  };

  const paneSamples = {
    minHeight: '555px',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginBottom: m,
    padding: m,
    backgroundColor: theme.palette.paneBackground,
  };

  /******************************************************************************/

  return {
    container,
    code,
    settings,
    panes,
    paneCode,
    paneSettings,
    paneSamples,
  };
}

/******************************************************************************/
