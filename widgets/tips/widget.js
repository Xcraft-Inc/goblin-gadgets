import React from 'react';
import Widget from 'goblin-laboratory/widgets/widget';
import T from 't';

import * as styles from './styles';
import Label from 'goblin-gadgets/widgets/label/widget';
import Button from 'goblin-gadgets/widgets/button/widget';

/******************************************************************************/

class Tips extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;

    this.onHide = this.onHide.bind(this);
    this.onPrev = this.onPrev.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onShow = this.onShow.bind(this);
  }

  //#region rank
  get rank() {
    return this.props.data ? this.props.data.get('rank') : 0;
  }

  set rank(rank) {
    const state = {rank};

    this.doFor(this.props.clientSessionId, 'set-tips', {
      tipsId: this.props.id,
      state,
    });
  }
  //#endregion

  onHide() {
    this.rank = -1; // hide tips
  }

  onPrev() {
    let rank = this.rank - 1;
    if (rank < 0) {
      rank = this.props.tips.length - 1;
    }
    this.rank = rank; // show previous tip
  }

  onNext() {
    let rank = this.rank + 1;
    if (rank > this.props.tips.length - 1) {
      rank = 0;
    }
    this.rank = rank; // show next tip
  }

  onShow() {
    this.rank = 0; // show first tip
  }

  /******************************************************************************/

  renderTip() {
    const rank = this.rank;

    if (rank === -1) {
      return null;
    }

    const tip = this.props.tips[rank];

    return (
      <div className={this.styles.classNames.tip}>
        <Label fontSize="75%" disabled={true} text={tip} />
      </div>
    );
  }

  renderButtons() {
    if (this.rank === -1) {
      return (
        <div className={this.styles.classNames.buttons}>
          <Button
            border="none"
            width="20px"
            height="20px"
            glyph="solid/ellipsis-h"
            tooltip={T('Montrer les astuces')}
            onClick={this.onShow}
          />
        </div>
      );
    } else if (this.props.layout === 'horizontal') {
      return (
        <div className={this.styles.classNames.buttons}>
          <Button
            border="none"
            width="20px"
            height="20px"
            glyph="solid/chevron-left"
            tooltip={T('Astuce précédente')}
            onClick={this.onPrev}
          />
          <Button
            border="none"
            width="20px"
            height="20px"
            glyph="solid/chevron-right"
            tooltip={T('Astuce suivante')}
            onClick={this.onNext}
          />
          <Button
            border="none"
            width="20px"
            height="20px"
            glyph="solid/times"
            tooltip={T('Fermer les astuces')}
            onClick={this.onHide}
          />
        </div>
      );
    } else {
      return (
        <div className={this.styles.classNames.buttons}>
          <Button
            border="none"
            width="20px"
            height="20px"
            glyph="solid/times"
            tooltip={T('Fermer les astuces')}
            onClick={this.onHide}
          />
          <Button
            border="none"
            width="20px"
            height="20px"
            glyph="solid/chevron-up"
            tooltip={T('Astuce précédente')}
            onClick={this.onPrev}
          />
          <Button
            border="none"
            width="20px"
            height="20px"
            glyph="solid/chevron-down"
            tooltip={T('Astuce suivante')}
            onClick={this.onNext}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div
        className={
          this.rank === -1
            ? this.styles.classNames.tipsHidden
            : this.styles.classNames.tipsShowed
        }
      >
        {this.renderTip()}
        {this.renderButtons()}
      </div>
    );
  }
}

/******************************************************************************/

export default Widget.connect((state, props) => {
  const userSession = Widget.getUserSession(state);
  const data = userSession.get(`tips.${props.id}`);
  const clientSessionId = userSession.get('id');

  return {clientSessionId, data};
})(Tips);
