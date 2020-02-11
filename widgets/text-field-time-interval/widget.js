//T:2019-02-27
import T from 't';
import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import * as Bool from 'gadgets/helpers/bool-helpers';
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
    this.endBeforeChange = this.endBeforeChange.bind(this);
    this.startBeforeChange = this.startBeforeChange.bind(this);
  }

  onNowClicked() {
    const now = TimeConverters.getNowCanonical();
    this.setModelValue(this.props.startModel, now, true);
    this.setModelValue(this.props.endModel, now, true);
  }

  endBeforeChange(value) {
    if (
      !this.props.endValue ||
      this.props.endValue === '' ||
      value > this.props.endValue
    ) {
      this.setModelValue(this.props.endModel, value, true);
    }
  }

  startBeforeChange(value) {
    if (
      !this.props.startValue ||
      this.props.startValue === '' ||
      value < this.props.startValue
    ) {
      this.setModelValue(this.props.startModel, value, true);
    }
  }

  get hasError() {
    return this.props.minTime > this.props.maxTime;
  }

  /******************************************************************************/

  renderStartTextField() {
    return (
      <TextFieldTyped
        width="70px"
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
        beforeChange={this.endBeforeChange}
      />
    );
  }

  renderEndTextField() {
    return (
      <TextFieldTyped
        width="70px"
        horizontalSpacing={
          Bool.isTrue(this.props.hasNowButton)
            ? 'overlap'
            : this.props.horizontalSpacing
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
        beforeChange={this.startBeforeChange}
      />
    );
  }

  renderNowButton() {
    if (
      Bool.isTrue(this.props.hasNowButton) &&
      !Bool.isTrue(this.props.readonly)
    ) {
      return (
        <Button
          shape="right-rounded"
          glyph="solid/arrow-alt-circle-left"
          disabled={Bool.isTrue(this.props.disabled || this.props.readonly)}
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
    if (Bool.isFalse(this.props.show)) {
      return null;
    }

    const boxClass = this.styles.classNames.box;

    return (
      <span disabled={this.props.disabled} className={boxClass}>
        {this.renderStartTextField()}
        {this.renderEndTextField()}
        {this.renderNowButton()}
      </span>
    );
  }
}

/******************************************************************************/

export default Widget.connect((state, props) => {
  const minTime = state.get(props.model + props.startModel);
  const maxTime = state.get(props.model + props.endModel);
  return {minTime, maxTime};
})(TextFieldTimeInterval);
