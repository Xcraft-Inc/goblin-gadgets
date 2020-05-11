//T:2019-02-27
import T from 't';
import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import {date as DateConverters} from 'xcraft-core-converters';
import TextFieldTyped from 'goblin-gadgets/widgets/text-field-typed/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import * as styles from './styles';

/******************************************************************************/

class TextFieldDateInterval extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.changePeriod = this.changePeriod.bind(this);
  }

  changePeriod(direction) {
    const p = DateConverters.changePeriod(
      this.props.minDate,
      this.props.maxDate,
      direction
    );

    this.setBackendValue(
      this.props.entityFullPath + this.props.startModel,
      p.fromDate
    );
    this.setBackendValue(
      this.props.entityFullPath + this.props.endModel,
      p.toDate
    );
  }

  get hasError() {
    return this.props.minDate > this.props.maxDate;
  }

  /******************************************************************************/

  renderButtonPrev() {
    if (!this.props.readonly) {
      return (
        <Button
          shape="left-rounded"
          glyph="solid/chevron-left"
          disabled={this.props.disabled || this.props.readonly}
          horizontalSpacing="overlap"
          tooltip={T('Période précédente')}
          onClick={() => this.changePeriod(-1)}
        />
      );
    } else {
      return null;
    }
  }

  renderStartTextField() {
    return (
      <TextFieldTyped
        width="140px"
        horizontalSpacing="overlap"
        type="date"
        hintText={this.props.startHintText || T('Début', 'date de début')}
        tooltip={this.props.startTooltip || T('Date de début')}
        selectAllOnFocus={this.props.selectAllOnFocus}
        readonly={this.props.readonly}
        disabled={this.props.disabled}
        required={this.props.required}
        wrong={this.hasError}
        model={this.props.startModel}
        maxDate={this.props.maxDate}
        mode="soft"
      />
    );
  }

  renderEndTextField() {
    return (
      <TextFieldTyped
        width="140px"
        horizontalSpacing={
          this.props.readonly ? this.props.horizontalSpacing : 'overlap'
        }
        type="date"
        hintText={this.props.endHintText || T('Fin', 'date de fin')}
        tooltip={this.props.endTooltip || T('Date de fin')}
        selectAllOnFocus={this.props.selectAllOnFocus}
        readonly={this.props.readonly}
        disabled={this.props.disabled}
        required={this.props.required}
        wrong={this.hasError}
        model={this.props.endModel}
        minDate={this.props.minDate}
        mode="soft"
      />
    );
  }

  renderButtonNext() {
    if (!this.props.readonly) {
      return (
        <Button
          shape="right-rounded"
          glyph="solid/chevron-right"
          disabled={this.props.disabled || this.props.readonly}
          horizontalSpacing={this.props.horizontalSpacing}
          tooltip={T('Période suivante')}
          onClick={() => this.changePeriod(1)}
        />
      );
    } else {
      return null;
    }
  }

  render() {
    if (this.props.show === false) {
      return null;
    }

    return (
      <span
        disabled={this.props.disabled}
        className={this.styles.classNames.textFieldDateInterval}
      >
        {this.renderButtonPrev()}
        {this.renderStartTextField()}
        {this.renderEndTextField()}
        {this.renderButtonNext()}
      </span>
    );
  }
}

/******************************************************************************/

export default Widget.connect((state, props) => {
  const minDate = state.get(props.entityFullPath + props.startModel);
  const maxDate = state.get(props.entityFullPath + props.endModel);

  return {minDate, maxDate};
})(TextFieldDateInterval);
