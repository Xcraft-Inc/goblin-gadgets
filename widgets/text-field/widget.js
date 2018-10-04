import React from 'react';
import Widget from 'laboratory/widget';
import {Control, actions} from 'react-redux-form/immutable';
const _ = require('lodash');
const Bool = require('gadgets/helpers/bool-helpers');
const Tooltip = require('gadgets/helpers/tooltip-helpers');

import FlyingBalloon from 'gadgets/flying-balloon/widget';
import Label from 'gadgets/label/widget';

function omit(object, props) {
  if (object === null) {
    return {};
  }
  const newObject = {...object};

  if (typeof props === 'string') {
    delete newObject[props];
  } else {
    props.forEach(prop => {
      delete newObject[prop];
    });
  }

  return newObject;
}

/******************************************************************************/

class TextField extends Widget {
  constructor() {
    super(...arguments);

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.selectAll = this.selectAll.bind(this);

    this.hasFocus = false;
    this.hasChanged = false;
  }

  static get wiring() {
    return {
      id: 'id',
      kind: 'kind',
      text: 'text',
      glyph: 'glyph',
    };
  }

  onDebouncedChangedFunc = _.debounce(
    (onDebouncedChange, value) => onDebouncedChange(value),
    400
  );

  setText(text) {
    this.do('text', {text});
  }

  setKind(kind) {
    this.do('kind', {kind});
  }

  componentDidMount() {
    super.componentDidMount();
    if (Bool.isTrue(this.props.defaultFocus)) {
      this.selectAll();
    }
  }

  selectAll() {
    const selectAllOnFocus = this.props.selectAllOnFocus || !!this.props.hinter;
    if (Bool.isTrue(selectAllOnFocus)) {
      if (this.input) {
        this.input.focus();
        this.input.select();
      }
    } else {
      if (this.input) {
        this.input.focus();
      }
    }
  }

  onChange(e) {
    this.hasChanged = true;

    if (this.props.onDebouncedChange) {
      this.onDebouncedChangedFunc(this.props.onDebouncedChange, e.target.value);
    }
  }

  onFocus(e) {
    //- console.log ('text-field.onFocus');
    if (!Bool.isTrue(this.props.readonly)) {
      this.hasChanged = false;
      this.hasFocus = true;

      this.navToHinter();
      const selectAllOnFocus =
        this.props.selectAllOnFocus || !!this.props.hinter;
      if (Bool.isTrue(selectAllOnFocus)) {
        this.selectAll();
      }
      const x = this.props.onFocus;
      if (x) {
        x(e);
      }
    }
  }

  onBlur(e) {
    //- console.log ('text-field.onBlur');
    this.hasChanged = false;
    this.hasFocus = false;

    const x = this.props.onBlur;
    if (x) {
      x(e);
    }

    if (this.props.autocomplete) {
      e.persist();
      this.setBackendValue(this.props.autocomplete, e.target.value);
    }
  }

  /******************************************************************************/

  renderFlyingBalloon(props) {
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
          width="150%"
          maxWidth="500px"
          primaryText={props.warning}
          secondaryText={props.info}
          trianglePosition={trianglePosition}
        />
      );
    } else {
      return null;
    }
  }

  renderFocusForeground(props) {
    if (Bool.isTrue(this.props.embeddedFocus)) {
      return null;
    } else {
      const focusClass = this.styles.classNames.focus;
      return <div className={`toto ${focusClass}`} />;
    }
  }

  renderInput() {
    const options = {};
    if (Bool.isTrue(this.props.readonly)) {
      options.readOnly = 'readOnly';
    }

    const mapProps = {
      value: props => {
        if (this.props.displayValue) {
          return this.props.displayValue;
        }

        if (this.props.getDisplayValue) {
          //console.log (
          //  `TextField.value: this.hasFocus=${this.hasFocus} this.hasChanged=${this.hasChanged}`
          //);
          //console.dir (props);
          return this.props.getDisplayValue(
            this.hasChanged ? props.viewValue : props.modelValue, // (*)
            this.hasFocus && !this.hasChanged, // onFocus ?
            !this.hasFocus && !this.hasChanged // onBlur ?
          );
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

        return this.getModelValue(props.model);
      },
      warning: props => {
        if (props.getWarning) {
          return props.getWarning(
            this.hasChanged ? props.viewValue : props.modelValue, // (*)
            this.hasFocus && !this.hasChanged, // onFocus ?
            !this.hasFocus && !this.hasChanged // onBlur ?
          );
        }
      },
      info: props => {
        if (props.getInfo) {
          return props.getInfo(
            this.hasChanged ? props.viewValue : props.modelValue, // (*)
            this.hasFocus && !this.hasChanged, // onFocus ?
            !this.hasFocus && !this.hasChanged // onBlur ?
          );
        }
      },
    };

    // (*)
    // When text changing, use props.viewValue (editing value).
    // When onFocus/onBlur, use props.modelValue (canonical value).
    // Warning: in this case, props.viewValue is also canonical value !

    const beforeChange = (model, value) => {
      if (this.props.beforeChange) {
        const newValue = this.props.beforeChange(value);
        return actions.change(model, newValue);
      } else {
        return actions.change(model, value);
      }
    };

    const type = this.props.rows ? 'textarea' : 'text';
    const fieldClass =
      type === 'textarea'
        ? this.styles.classNames.textarea + ' mousetrap'
        : this.styles.classNames.field + ' mousetrap';

    const inputClass = this.styles.classNames.input;

    const Field = props => {
      let finalProps = omit(props, [
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

      let boxClass = this.styles.classNames.box;
      if (Bool.isTrue(this.props.required) && finalProps.value === '') {
        // Use style 'required' only if text is empty.
        boxClass = this.styles.classNames.boxRequired;
      }
      if (Bool.isTrue(this.props.requiredHinter) && finalProps.value !== '') {
        // Use style 'required' only if text is not empty.
        boxClass = this.styles.classNames.boxRequired;
      }

      if (this.props.autocomplete) {
        // TODO: style with something else
        boxClass = this.styles.classNames.boxRequired;
      }

      let glyph = null;
      if (this.props.getGlyph) {
        glyph = this.props.getGlyph(finalProps.value);
      }

      return (
        <div className={boxClass} title={Tooltip.prepare(this.props.tooltip)}>
          {glyph ? (
            <Label
              kind="text-field-combo-glyph"
              glyph={glyph.glyph}
              glyphColor={glyph.color}
            />
          ) : null}
          {type === 'textarea' ? (
            <textarea
              tabIndex="0"
              rows={this.props.rows}
              ref={node => {
                this.input = node;
              }}
              {...finalProps}
            />
          ) : (
            <input
              tabIndex="0"
              type={type}
              ref={node => {
                this.input = node;
              }}
              {...finalProps}
            />
          )}
          {this.renderFocusForeground(props)}
          {this.renderFlyingBalloon(props)}
        </div>
      );
    };

    let key =
      typeof this.props.model === 'string'
        ? this.props.model
        : this.props.hinter
          ? this.props.hinter
          : this.props.model();

    const defaultUpdateOn = this.props.hinter ? 'change' : 'blur';

    return (
      <Control
        className={`${fieldClass} ${inputClass}`}
        component={Field}
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
        onChange={this.onChange}
        onMouseUp={this.props.onMouseUp}
        disabled={Bool.isTrue(this.props.disabled)}
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

  render() {
    if (Bool.isFalse(this.props.show)) {
      return null;
    }
    return this.renderInput();
  }
}

/******************************************************************************/
export default TextField;
