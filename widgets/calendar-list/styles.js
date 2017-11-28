import {Unit} from 'electrum-theme';
import * as Bool from 'gadgets/boolean-helpers';

/******************************************************************************/

export default function styles (theme, props) {
  const boxStyle = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    margin: '0px 0px 0px 20px',
  };

  const listStyle = {
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    margin: '5px 0px 0px 0px',
    backgroundColor: '#eee',
    overflowY: 'auto',
  };

  const buttonsStyle = {
    maxHeight: '32px',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: '1',
  };

  return {
    box: boxStyle,
    list: listStyle,
    buttons: buttonsStyle,
  };
}

/******************************************************************************/