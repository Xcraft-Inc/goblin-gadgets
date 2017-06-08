import {React} from 'electrum';
import {ReactDOM} from 'electrum';
import Widget from 'laboratory/widget';
// import {FlyingBalloon} from '../../../all-components.js';

/******************************************************************************/

class TextField extends Widget {

  constructor (props) {
    super (props);
  }

  get wiring () {
    return {
      id:    'id',
      kind:  'kind',
      text:  'text',
      glyph: 'glyph',
    };
  }

  setText (text) {
    this.do ('text', {text});
  }

  setKind (kind) {
    this.do ('kind', {kind});
  }

  componentDidMount () {
    const defaultFocus = this.read ('default-focus');
    if (defaultFocus === 'true') {
      this.selectAll ();
    }
  }

  selectAll () {
    const selectAllOnFocus = this.read ('select-all-on-focus');
    const node = ReactDOM.findDOMNode (this.refs.inputTag);
    if (selectAllOnFocus === 'true') {
      // Set focus and select all to child <input>, asynchronously.
      setTimeout (() => {
        node.focus ();
        node.select ();
      }, 0);
    } else {
      // Set focus to child <input>, asynchronously.
      setTimeout (() => {
        node.focus ();
      }, 0);
    }
  }

  onChange () {
    this.forceUpdate ();
  }

  onMyFocus (e) {
    this.onFocus (e);
    const selectAllOnFocus = this.read ('select-all-on-focus');
    if (selectAllOnFocus === 'true') {
      this.selectAll ();
    }
    const x = this.read ('onFocus');
    if (x) {
      x (e);
    }
  }

  onMyBlur (e) {
    this.onBlur (e);
    const x = this.read ('onBlur');
    if (x) {
      x (e);
    }
  }

  onMyMouseDown (e) {
    const x = this.read ('onMouseDown');
    if (x) {
      x (e);
    }
  }

  renderInput () {
    const state    = this.props.state.find ();
    const disabled = this.read ('disabled');
    const id       = this.read ('id');
    const value    = this.read ('value');
    const hintText = this.read ('hint-text');
    const rows     = this.read ('rows');
    const readonly = this.read ('readonly');
    const tabIndex = this.props['tab-index'];

    const options = [];
    if (readonly === 'true') {
      options.readOnly = 'readOnly';
    }

    if (rows) {
      const textareaStyle = this.styles.textarea;
      return (
        <textarea
          ref         = 'inputTag'
          id          = {id}
          style       = {textareaStyle}
          onChange    = {::this.onChange}
          onFocus     = {::this.onMyFocus}
          onBlur      = {::this.onMyBlur}
          onMouseDown = {::this.onMyMouseDown}
          onKeyDown   = {::this.onKeyDown}
          onKeyUp     = {::this.onKeyUp}
          onSelect    = {::this.onSelect}
          disabled    = {disabled}
          rows        = {rows}
          tabIndex    = {tabIndex}
          value       = {value || ''}
          {...options}
          />
      );
    } else {
      const fieldStyle = this.styles.field;
      return (
        <input
          ref         = 'inputTag'
          id          = {id}
          onChange    = {::this.onChange}
          onFocus     = {::this.onMyFocus}
          onBlur      = {::this.onMyBlur}
          onMouseDown = {::this.onMyMouseDown}
          onKeyDown   = {::this.onKeyDown}
          onKeyUp     = {::this.onKeyUp}
          onSelect    = {::this.onSelect}
          disabled    = {disabled}
          maxLength   = {this.props.maxLength}
          placeholder = {hintText}
          size        = {this.props.size || 'size'}
          style       = {fieldStyle}
          type        = {this.props.type || 'text'}
          key         = 'input'
          tabIndex    = {tabIndex}
          value       = {value || ''}
          {...options}
          />
      );
    }
  }

  renderFlyingBalloon () {
    const messageWarning      = this.read ('message-warning');
    const messageInfo         = this.read ('message-info');
    const flyingBalloonAnchor = this.read ('flying-balloon-anchor');
    // Conversion from flying-balloon-anchor to triangle-position.
    const trianglePosition = {
      bottom: 'top',
      top:    'bottom',
      left:   'right',
      right:  'left',
    } [flyingBalloonAnchor];

    if (messageWarning || messageInfo) {
      // return (
      //   <FlyingBalloon
      //     primary-text      = {messageWarning}
      //     secondary-text    = {messageInfo}
      //     triangle-position = {trianglePosition}
      //     {...this.link ()} />
      // );
      return null;
    } else {
      return null;
    }
  }

  widget () {
    return props => {
      const {state} = this.props;
      const disabled = this.read ('disabled');
      const tooltip  = this.read ('tooltip');

      const boxStyle = this.styles.box;

      return (
      <span
        disabled = {disabled}
        style    = {boxStyle}
        title    = {tooltip}
        >
        {this.renderInput ()}
        {this.renderFlyingBalloon ()}
      </span>
      );
    }
  }
}

/******************************************************************************/
