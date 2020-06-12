//T:2019-02-27
import T from 't';
import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import {time as TimeConverters} from 'xcraft-core-converters';
import TextFieldTyped from 'goblin-gadgets/widgets/text-field-typed/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import * as styles from './styles';

/******************************************************************************/

class TextFieldTimeInterval extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.onNowClicked = this.onNowClicked.bind(this);
    this.onChangeStart = this.onChangeStart.bind(this);
    this.onChangeEnd = this.onChangeEnd.bind(this);
  }

  getFullPathFromModel(model) {
    if (!this.context.model) {
      throw new Error(
        'Cannot resolve context model, your Field is not in a Form ?'
      );
    }
    return `${this.context.model}${model}`;
  }

  // prettier-ignore
  onNowClicked() {
    const now = TimeConverters.getNowCanonical();
    this.setBackendValue(this.props.entityFullPath + this.props.startModel, now);
    this.setBackendValue(this.props.entityFullPath + this.props.endModel, now);
  }

  onChangeStart(time) {
    const path = this.getFullPathFromModel(this.props.startModel);
    this.setBackendValue(path, time);

    if (
      this.props.defaultDurationToEnd &&
      (!this.props.maxTime || time > this.props.maxTime)
    ) {
      time = TimeConverters.getCalcTime(time, this.props.defaultDurationToEnd);
      const path = this.getFullPathFromModel(this.props.endModel);
      this.setBackendValue(path, time);
    }
  }

  onChangeEnd(time) {
    const path = this.getFullPathFromModel(this.props.endModel);
    this.setBackendValue(path, time);

    if (
      this.props.defaultDurationFromStart &&
      (!this.props.minTime || time < this.props.minTime)
    ) {
      time = TimeConverters.getCalcTime(
        time,
        this.props.defaultDurationFromStart
      );
      const path = this.getFullPathFromModel(this.props.startModel);
      this.setBackendValue(path, time);
    }
  }

  get hasError() {
    return this.props.minTime > this.props.maxTime;
  }

  /******************************************************************************/

  renderStartTextField() {
    return (
      <TextFieldTyped
        width="110px"
        horizontalSpacing="overlap"
        type="time"
        hintText={this.props.startHintText || T('Début', 'heure de début')}
        tooltip={this.props.startTooltip || T('Heure de début')}
        selectAllOnFocus={this.props.selectAllOnFocus}
        readonly={this.props.readonly}
        disabled={this.props.disabled}
        required={this.props.required}
        wrong={this.hasError}
        model={this.props.startModel}
        maxTime={this.props.maxTime}
        mode="soft"
        onChange={this.onChangeStart}
      />
    );
  }

  renderEndTextField() {
    return (
      <TextFieldTyped
        width="110px"
        horizontalSpacing={
          this.props.hasNowButton ? 'overlap' : this.props.horizontalSpacing
        }
        type="time"
        hintText={this.props.endHintText || T('Fin', 'heure de fin')}
        tooltip={this.props.endTooltip || T('Heure de fin')}
        selectAllOnFocus={this.props.selectAllOnFocus}
        readonly={this.props.readonly}
        disabled={this.props.disabled}
        required={this.props.required}
        wrong={this.hasError}
        model={this.props.endModel}
        minTime={this.props.minTime}
        mode="soft"
        onChange={this.onChangeEnd}
      />
    );
  }

  renderNowButton() {
    if (this.props.hasNowButton && !this.props.readonly) {
      return (
        <Button
          shape="right-rounded"
          glyph="solid/arrow-alt-circle-left"
          disabled={this.props.disabled || this.props.readonly}
          horizontalSpacing={this.props.horizontalSpacing}
          tooltip={T('Maintenant')}
          onClick={this.onNowClicked}
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
        className={this.styles.classNames.textFieldTimeInterval}
      >
        {this.renderStartTextField()}
        {this.renderEndTextField()}
        {this.renderNowButton()}
      </span>
    );
  }
}

/******************************************************************************/

export default Widget.connect((state, props) => {
  const minTime = state.get(props.entityFullPath + props.startModel);
  const maxTime = state.get(props.entityFullPath + props.endModel);
  return {minTime, maxTime};
})(TextFieldTimeInterval);
