import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'laboratory/widget';
import {Control} from 'react-redux-form/immutable';
import FlyingBalloon from 'gadgets/flying-balloon/widget';

/******************************************************************************/

class TextField extends Widget {
  constructor (props) {
    super (props);
  }

  static get wiring () {
    return {
      id: 'id',
      kind: 'kind',
      text: 'text',
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

  onChange () {}

  onFieldFocus (e) {
    this.onFocusHinter (e);

    const selectAllOnFocus = this.read ('select-all-on-focus');
    if (selectAllOnFocus === 'true') {
      this.selectAll ();
    }
  }

  onBlur (e) {
    this.onBlur (e);
    const x = this.read ('onBlur');
    if (x) {
      x (e);
    }
  }

  onMouseDown (e) {
    const x = this.read ('onMouseDown');
    if (x) {
      x (e);
    }
  }

  renderInput () {
    const disabled = this.read ('disabled');
    const id = this.read ('id');
    const value = this.read ('value');
    const hintText = this.read ('hint-text');
    const rows = this.read ('rows');
    const readonly = this.read ('readonly');
    const tabIndex = this.props['tab-index'];

    const options = [];
    if (readonly === 'true') {
      options.readOnly = 'readOnly';
    }

    let useHinter = null;
    if (this.props.hinter) {
      useHinter = {
        ref: input => {
          const hid = this.getHinterId ();
          if (hid && input) {
            if (this.props.hinter === hid) {
              const sel = this.getSelectionStateInParams ();
              input.focus ();
              input.setSelectionRange (sel.ss, sel.se, sel.sd);
            }
          }
        },
      };
    }

    if (rows) {
      const textareaStyle = this.styles.textarea;
      return (
        <input
          type="textarea"
          id={id}
          {...useHinter}
          onFocus={::this.onFieldFocus}
          style={textareaStyle}
          onChange={this.props.onChange}
          disabled={disabled}
          rows={rows}
          tabIndex={tabIndex}
          value={value}
          {...options}
        />
      );
    } else {
      const fieldStyle = this.styles.field;
      return (
        <input
          id={id}
          {...useHinter}
          onFocus={::this.onFieldFocus}
          onChange={this.props.onChange}
          disabled={disabled}
          maxLength={this.props.maxLength}
          placeholder={hintText}
          size={this.props.size || 'size'}
          style={fieldStyle}
          type={this.props.type || 'text'}
          key="input"
          tabIndex={tabIndex}
          value={value}
          {...options}
        />
      );
    }
  }

  renderFlyingBalloon () {
    const messageWarning = this.read ('message-warning');
    const messageInfo = this.read ('message-info');
    const flyingBalloonAnchor = this.read ('flying-balloon-anchor');
    // Conversion from flying-balloon-anchor to triangle-position.
    const trianglePosition = {
      bottom: 'top',
      top: 'bottom',
      left: 'right',
      right: 'left',
    }[flyingBalloonAnchor];

    if (messageWarning || messageInfo) {
      return (
        <FlyingBalloon
          primary-text={messageWarning}
          secondary-text={messageInfo}
          triangle-position={trianglePosition}
        />
      );
    } else {
      return null;
    }
  }

  render () {
    const disabled = this.read ('disabled');
    const tooltip = this.read ('tooltip');

    const boxStyle = this.styles.box;

    return (
      <span disabled={disabled} style={boxStyle} title={tooltip}>
        {this.renderInput ()}
        {this.renderFlyingBalloon ()}
      </span>
    );
  }
}

/******************************************************************************/
export default TextField;
