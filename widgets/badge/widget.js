import {React} from 'electrum';
import Widget from 'laboratory/widget';

/******************************************************************************/

class Badge extends Widget {
  constructor (props) {
    super (props);
  }

  widget () {
    return props => {
      const {state} = this.props;
      const disabled = this.read ('disabled');
      const inputValue = this.read ('value');

      let truncatedValue = inputValue ? inputValue.toString () : '';
      if (truncatedValue.length > 3) {
        truncatedValue = truncatedValue.substring (0, 3) + '...';
      }

      const boxStyle = this.mergeStyles ('box');
      const labelStyle = this.mergeStyles ('label');

      return (
        <div key="badge" disabled={disabled} style={boxStyle}>
          <label style={labelStyle}>
            {truncatedValue}
          </label>
        </div>
      );
    };
  }
}

/******************************************************************************/
