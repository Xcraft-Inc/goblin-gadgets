import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'laboratory/widget';
import {Control, Errors, actions} from 'react-redux-form';
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
    super.componentDidMount ();

    const defaultFocus = this.props['default-focus'];
    if (defaultFocus === 'true') {
      this.selectAll ();
    }
  }

  selectAll () {
    const selectAllOnFocus = this.props.selectAllOnFocus;
    if (selectAllOnFocus === 'true') {
      if (this.input) {
        this.input.focus ();
        this.input.select ();
      }
    } else {
      if (this.input) {
        this.input.focus ();
      }
    }
  }

  onChange () {}

  onFieldFocus () {
    this.navToHinter ();

    const selectAllOnFocus = this.props.selectAllOnFocus;
    if (selectAllOnFocus === 'true') {
      this.selectAll ();
    }
  }

  onBlur (e) {
    this.onBlur (e);
    const x = this.props.onBlur;
    if (x) {
      x (e);
    }
  }

  onMouseDown (e) {
    const x = this.props.onMouseDown;
    if (x) {
      x (e);
    }
  }

  renderInput () {
    const disabled = this.props.disabled;
    const model = this.props.model;
    const hintText = this.props.hintText;
    const rows = this.props.rows;
    const readonly = this.props.readonly;
    const tabIndex = this.props['tab-index'];

    const options = [];
    if (readonly === 'true') {
      options.readOnly = 'readOnly';
    }

    const beforeChange = (model, value) => {
      if (this.props.beforeChange) {
        const newValue = this.props.beforeChange (value);
        return actions.change (model, newValue);
      } else {
        return actions.change (model, value);
      }
    };

    if (rows) {
      const textareaClass = this.styles.classNames.textarea + ' mousetrap';

      return (
        <Control.textarea
          id={model}
          changeAction={beforeChange}
          getRef={node => (this.input = node)}
          parser={this.props.parser}
          errors={this.props.errors}
          mapProps={{
            value: props => props.viewValue,
          }}
          updateOn={this.props.updateOn ? this.props.updateOn : 'change'}
          model={model}
          onFocus={::this.onFieldFocus}
          className={textareaClass}
          onChange={this.props.onChange}
          disabled={disabled}
          rows={rows}
          tabIndex={tabIndex}
          {...options}
        />
      );
    } else {
      const fieldClass = this.styles.classNames.field + ' mousetrap';

      const beforeChange = (model, value) => {
        if (this.props.beforeChange) {
          const newValue = this.props.beforeChange (value);
          return actions.change (model, newValue);
        } else {
          return actions.change (model, value);
        }
      };

      return (
        <Control.text
          id={model}
          changeAction={beforeChange}
          getRef={node => (this.input = node)}
          parser={this.props.parser}
          errors={this.props.errors}
          mapProps={{
            value: props => props.viewValue,
          }}
          updateOn={this.props.updateOn ? this.props.updateOn : 'change'}
          model={model}
          onFocus={::this.onFieldFocus}
          disabled={disabled}
          maxLength={this.props.maxLength}
          placeholder={hintText}
          size={this.props.size || 'size'}
          className={fieldClass}
          type={this.props.type || 'text'}
          key="input"
          tabIndex={tabIndex}
          {...options}
        />
      );
    }
  }

  renderFlyingBalloon () {
    const messageWarning = this.props.messageWarning;
    const messageInfo = this.props.messageInfo;
    const flyingBalloonAnchor = this.props['flying-balloon-anchor'];
    // Conversion from flying-balloon-anchor to triangle-position.
    const trianglePosition = {
      bottom: 'top',
      top: 'bottom',
      left: 'right',
      right: 'left',
    }[flyingBalloonAnchor];

    if (messageWarning || messageInfo) {
      return (
        <Errors
          model={this.props.model}
          show="touched"
          messages={{warning: messageWarning}}
          component={props => (
            <FlyingBalloon
              primary-text={props.children}
              secondary-text={messageInfo}
              triangle-position={trianglePosition}
            />
          )}
        />
      );
    } else {
      return null;
    }
  }

  render () {
    const disabled = this.props.disabled;
    const tooltip = this.props.tooltip;

    const boxClass = this.styles.classNames.box;

    return (
      <span disabled={disabled} className={boxClass} title={tooltip}>
        {this.renderInput ()}
        {this.renderFlyingBalloon ()}
      </span>
    );
  }
}

/******************************************************************************/
export default TextField;
