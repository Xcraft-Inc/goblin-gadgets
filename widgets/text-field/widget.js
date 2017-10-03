import React from 'react';
import ReactDOM from 'react-dom';
import Widget from 'laboratory/widget';
import {Control, Errors, actions} from 'react-redux-form/immutable';
import * as Bool from '../helpers/boolean-helpers.js';

import FlyingBalloon from 'gadgets/flying-balloon/widget';

function omit (object, props) {
  if (object === null) {
    return {};
  }
  const newObject = {...object};

  if (typeof props === 'string') {
    delete newObject[props];
  } else {
    props.forEach (prop => {
      delete newObject[prop];
    });
  }

  return newObject;
}

/******************************************************************************/

class TextField extends Widget {
  constructor () {
    super (...arguments);

    this.onFocus = this.onFocus.bind (this);
    this.onBlur = this.onBlur.bind (this);
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

  onFocus (e) {
    //- console.log ('text-field.onFocus');
    this.navToHinter ();
    const selectAllOnFocus = this.props.selectAllOnFocus || !!this.props.hinter;
    if (Bool.isTrue (selectAllOnFocus)) {
      this.selectAll ();
    }
    const x = this.props.onFocus;
    if (x) {
      x (e);
    }
  }

  onBlur (e) {
    //- console.log ('text-field.onBlur');
    const x = this.props.onBlur;
    if (x) {
      x (e);
    }
  }

  /******************************************************************************/

  renderFlyingBalloon (props) {
    if (props.warning || props.info) {
      const trianglePosition = {
        bottom: 'top',
        top: 'bottom',
        left: 'right',
        right: 'left',
        undefined: 'top',
      }[props.flyingBalloonAnchor];

      return (
        <FlyingBalloon
          primaryText={props.warning}
          secondaryText={props.info}
          trianglePosition={trianglePosition}
        />
      );
    } else {
      return null;
    }
  }

  renderFocusForeground (props) {
    if (Bool.isTrue (this.props.embededFocus)) {
      return null;
    } else {
      const focusClass = this.styles.classNames.focus;
      return <div className={`toto ${focusClass}`} title={props.tooltip} />;
    }
  }

  renderInput () {
    const options = {};
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

    const type = this.props.rows ? 'textarea' : 'text';
    const fieldClass = type === 'textarea'
      ? this.styles.classNames.textarea + ' mousetrap'
      : this.styles.classNames.field + ' mousetrap';

    const boxClass = this.styles.classNames.box;
    const inputClass = this.styles.classNames.input;

    const Field = props => {
      let finalProps = omit (props, [
        'getInfo',
        'getWarning',
        'warning',
        'info',
        'model',
        'dispatch',
      ]);

      if (props.value === null || props.value === undefined) {
        finalProps.value = '';
      }

      return (
        <div className={boxClass}>
          {type === 'textarea'
            ? <textarea
                tabIndex="0"
                rows={this.props.rows}
                ref={node => {
                  this.input = node;
                }}
                {...finalProps}
              />
            : <input
                tabIndex="0"
                type={type}
                ref={node => {
                  this.input = node;
                }}
                {...finalProps}
              />}
          {this.renderFocusForeground (props)}
          {this.renderFlyingBalloon (props)}
        </div>
      );
    };

    const fullModelPath = this.props.hinter
      ? `${this.context.model}.${this.props.hinter}`
      : `${this.context.model}.${this.props.model}`;

    const WiredTextField = this.mapWidget (Field, 'version', fullModelPath);

    let key = typeof this.props.model === 'string'
      ? this.props.model
      : this.props.hinter ? this.props.hinter : this.props.model ();

    const defaultUpdateOn = this.props.hinter ? 'change' : 'blur';

    return (
      <Control
        className={`${fieldClass} ${inputClass}`}
        component={WiredTextField}
        changeAction={beforeChange}
        getInfo={this.props.getInfo}
        getWarning={this.props.getWarning}
        parser={this.props.parser}
        errors={this.props.errors}
        mapProps={mapProps}
        updateOn={this.props.updateOn ? this.props.updateOn : defaultUpdateOn}
        model={this.props.hinter ? `.${this.props.hinter}` : this.props.model}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onMouseUp={this.props.onMouseUp}
        disabled={Bool.isTrue (this.props.disabled)}
        maxLength={this.props.maxLength}
        placeholder={this.props.hintText}
        size={this.props.size || 'size'}
        type={this.props.type || 'text'}
        key={key}
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
