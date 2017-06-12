import {React} from 'electrum';

/******************************************************************************/

class Gauge extends Widget {
  constructor (props) {
    super (props);
  }

  widget () {
    return props => {
      const boxStyle = this.styles.box;
      const contentStyle = this.styles.content;

      return (
        <div style={boxStyle}>
          <div style={contentStyle} />
        </div>
      );
    };
  }
}

/******************************************************************************/
