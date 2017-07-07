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

  renderNotification (data, keyIndex) {
    return (
      <Notification
        key={keyIndex}
        data={data}
        status={data.status}
        onClick={() =>
          this.doAs ('laboratory', 'click-notification', {notification: data})}
        onDelete={() =>
          this.doAs ('laboratory', 'remove-notification', {notification: data})}
      />
    );
  }

  renderNotifications (notifications) {
    if (!notifications || notifications.size === 0) {
      return null;
    }
    // The most recent notification first (on top).
    return this.shred (notifications)
      .reverse ()
      .select ((k, v) => v.toJS ())
      .map (::this.renderNotification);
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
