import React from 'react';
import Widget from 'laboratory/widget';

import Label from 'gadgets/label/widget';
import Button from 'gadgets/button/widget';
import Notification from 'gadgets/notification/widget';

/******************************************************************************/

class Notifications extends Widget {
  constructor (props) {
    super (props);
  }

  static get wiring () {
    return {
      id: 'id',
      show: 'showNotifications',
      data: 'notifications',
      dnd: 'dnd',
      onlyNews: 'onlyNews',
    };
  }

  renderHeader () {
    const headerClass = this.styles.classNames.header;
    const headerRowClass = this.styles.classNames.headerRow;

    return (
      <div className={headerClass}>
        <div className={headerRowClass}>
          <Button
            glyph={this.props.dnd === 'true' ? 'toggle-on' : 'toggle-off'}
            text="Ne pas me déranger"
            kind="notification"
            onClick={() => this.doAs ('laboratory', 'toggle-dnd')}
          />
        </div>
        <div className={headerRowClass}>
          <Button
            glyph={this.props.onlyNews === 'true' ? 'toggle-on' : 'toggle-off'}
            text="Seulement les nouvelles"
            kind="notification"
            onClick={() => this.doAs ('laboratory', 'toggle-only-news')}
          />
          <Label grow="1" />
          <Button
            text="Tout effacer"
            kind="notification"
            onClick={() => this.doAs ('laboratory', 'remove-notifications')}
          />
        </div>
      </div>
    );
  }

  renderNotification (notification, index) {
    return (
      <Notification
        key={index}
        data={notification}
        status={notification.status}
        onClick={() =>
          this.doAs ('laboratory', 'click-notification', {notification})}
        onDelete={() =>
          this.doAs ('laboratory', 'remove-notification', {notification})}
      />
    );
  }

  renderNotifications (notifications) {
    if (!notifications || notifications.size === 0) {
      return null;
    }
    // The most recent notification first (on top).
    const nn = this.shred (notifications);
    let index = 0;
    return nn.linq
      .where (
        n => this.props.onlyNews === 'false' || n.get ('status') === 'not-read'
      )
      .orderByDescending (n => n.get ('order'))
      .select (n => {
        return this.renderNotification (n.toJS (), index++);
      })
      .toList ();
  }

  render () {
    const data = this.props.data;
    const show = this.props.show;
    if (!this.props.id) {
      return null;
    }

    const panelClass = show === 'true'
      ? this.styles.classNames.panel
      : this.styles.classNames.panelHidden;
    const notificationsClass = this.styles.classNames.notifications;

    return (
      <div className={panelClass}>
        {this.renderHeader ()}
        <div className={notificationsClass}>
          {this.renderNotifications (data)}
        </div>
      </div>
    );
  }
}

/******************************************************************************/
export default Notifications;
