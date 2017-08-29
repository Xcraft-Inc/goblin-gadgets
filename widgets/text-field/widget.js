import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'laboratory/widget';
import {Control, Errors, actions} from 'react-redux-form/immutable';
import * as Bool from '../helpers/boolean-helpers.js';

import FlyingBalloon from 'gadgets/flying-balloon/widget';

/******************************************************************************/

class TextField extends Widget {
  constructor () {
    super (...arguments);
    this.onFieldFocus = this.onFieldFocus.bind (this);
    this.selectAll = this.selectAll.bind (this);
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
    if (Bool.isTrue (this.props.defaultFocus)) {
      this.selectAll ();
    }
  }

  selectAll () {
    const selectAllOnFocus = this.props.selectAllOnFocus || !!this.props.hinter;
    if (Bool.isTrue (selectAllOnFocus)) {
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
    const selectAllOnFocus = this.props.selectAllOnFocus || !!this.props.hinter;
    if (Bool.isTrue (selectAllOnFocus)) {
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

  renderInput () {
    const options = [];
    if (Bool.isTrue (this.props.readonly)) {
      options.readOnly = 'readOnly';
    }

    const mapProps = {
      value: props => {
        if (this.props.displayValue) {
          return this.props.displayValue;
        }

        if (this.props.getDisplayValue) {
          return this.props.getDisplayValue (props.modelValue, props.viewValue);
        }

        if (
          this.props.defaultValue !== undefined &&
          props.modelValue === undefined &&
          props.viewValue === undefined
        ) {
          return this.props.defaultValue;
        }

        if (props.viewValue) {
          return props.viewValue;
        }

        const val = this.getModelValue (props.model);
        return val;
      },
      warning: props => {
        if (props.modelValue === props.viewValue) {
          return null;
        }
        if (props.getWarning) {
          return props.getWarning (props.modelValue, props.viewValue);
        }
      },
      info: props => {
        if (props.modelValue === props.viewValue) {
          return null;
        }
        if (props.getInfo) {
          return props.getInfo (props.modelValue, props.viewValue);
        }
      },
    };

    const beforeChange = (model, value) => {
      if (this.props.beforeChange) {
        const newValue = this.props.beforeChange (value);
        return actions.change (model, newValue);
      } else {
        return actions.change (model, value);
      }
    };

    const fieldClass = this.styles.classNames.field + ' mousetrap';

    const Field = props => {
      const type = props.rows ? 'textarea' : 'text';
      const boxClass = this.styles.classNames.box;
      if (props.warning || props.info) {
        const trianglePosition = {
          bottom: 'top',
          top: 'bottom',
          left: 'right',
          right: 'left',
          undefined: 'top',
        }[props.flyingBalloonAnchor];

        return (
          <div
            disabled={props.disabled}
            className={boxClass}
            title={props.tooltip}
          >
            <input
              type={type}
              {...props}
              ref={node => {
                this.input = node;
              }}
            />
            <FlyingBalloon
              primaryText={props.warning}
              secondaryText={props.info}
              trianglePosition={trianglePosition}
            />
          </div>
        );
      } else {
        return (
          <div
            disabled={props.disabled}
            className={boxClass}
            title={props.tooltip}
          >
            <input
              type={type}
              ref={node => {
                this.input = node;
              }}
              {...props}
            />
          </div>
        );
      }
    };

    const WiredTextField = this.WithModel (Field) (
      this.props.hinter ? `.${this.props.hinter}` : this.props.model
    );

    let key = typeof this.props.model === 'string'
      ? this.props.model
      : this.props.hinter ? this.props.hinter : this.props.model ();

    return (
      <Control
        className={fieldClass}
        component={WiredTextField}
        changeAction={beforeChange}
        getInfo={this.props.getInfo}
        getWarning={this.props.getWarning}
        parser={this.props.parser}
        errors={this.props.errors}
        mapProps={mapProps}
        updateOn={this.props.updateOn ? this.props.updateOn : 'change'}
        model={this.props.hinter ? `.${this.props.hinter}` : this.props.model}
        onFocus={this.onFieldFocus}
        onMouseDown={this.props.onMouseDown}
        disabled={this.props.disabled}
        maxLength={this.props.maxLength}
        placeholder={this.props.hintText}
        size={this.props.size || 'size'}
        type={this.props.type || 'text'}
        key={key}
        rows={this.props.rows}
        tabIndex={this.props.tabIndex}
        onKeyDown={this.props.onKeyDown}
        {...options}
      />
    );
  }

  render () {
    if (Bool.isFalse (this.props.show)) {
      return null;
    }
    return this.renderInput ();
  }
}

/******************************************************************************/
export default TextField;
