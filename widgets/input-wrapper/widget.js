import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import throttle from 'lodash/throttle';

/**
 * Wraps a raw input.
 *
 * @param {Component} Component - The raw input to wrap
 * @param {string} valueName - (optional) Can be used to rename the 'value' prop
 * @returns {Component} A new component
 */
export default function wrapRawInput(Component, valueName = 'value') {
  /**
   * InputWrapper memorises the raw (text) value displayed in the input and
   * only exposes the canonical value, that can be any JS value.
   * The canonical value changes less frequently. Usually only on input blur.
   *
   * props:
   * `value`: the canonical value.
   * `onChange`: function called by the component to change the canonical value.
   * `format`: (optional) function to transform the canonical value to the raw value to display in the input.
   * `parse`: (optional) function to transform the raw value to the canonical value.
   * `changeMode`: (optional) "blur" (default), "throttled" or "immediate".
   * `throttleDelay`: (optional).
   * other props are given to the underlying input.
   */
  return class InputWrapper extends Widget {
    constructor() {
      super(...arguments);
      this.changeValue = this.changeValue.bind(this);
      this.enterEditing = this.enterEditing.bind(this);
      this.leaveEditing = this.leaveEditing.bind(this);
      this.validate = this.validate.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleFocus = this.handleFocus.bind(this);
      this.handleBlur = this.handleBlur.bind(this);

      this.state = {
        edit: false,
        raw: undefined,
      };

      this.changeValueThrottled = throttle(
        this.changeValue,
        this.props.throttleDelay || 200
      );
    }

    changeValue(value) {
      if (this.props.parse) {
        value = this.props.parse(value);
      }
      this.props.onChange(value);
      return value;
    }

    enterEditing() {
      let raw = this.props[valueName];
      if (this.props.format) {
        raw = this.props.format(raw);
      }
      this.setState({
        raw,
        edit: true,
      });
    }

    leaveEditing(value) {
      this.changeValue(value);
      this.setState({
        edit: false,
        raw: undefined,
      });
    }

    validate(value) {
      let newValue = this.changeValue(value);
      if (this.props.format) {
        newValue = this.props.format(newValue);
      }
      this.setState({
        raw: newValue,
      });
    }

    handleChange(value) {
      this.setState({
        raw: value,
      });
      if (this.props.changeMode === 'throttled') {
        this.changeValueThrottled(value);
      } else if (this.props.changeMode === 'immediate') {
        this.changeValue(value);
      }
    }

    handleFocus(...args) {
      this.enterEditing();
      if (this.props.onFocus) {
        this.props.onFocus(...args);
      }
    }

    handleBlur(...args) {
      this.leaveEditing(...args);
      if (this.props.onBlur) {
        this.props.onBlur(...args);
      }
    }

    render() {
      const {
        format,
        parse,
        changeMode,
        throttleDelay,
        ...otherProps
      } = this.props;
      if (changeMode === 'passthrough') {
        return <Component {...otherProps} />;
      }
      let value;
      if (this.state.edit) {
        value = this.state.raw;
      } else {
        value = this.props[valueName];
        if (format) {
          value = format(value);
        }
      }
      const valueProp = {
        [valueName]: value,
      };
      return (
        <Component
          {...otherProps}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onValidate={this.validate}
          {...valueProp}
        />
      );
    }
  };
}
