import React from 'react';
import Widget from 'laboratory/widget';

import Container from 'gadgets/container/widget';
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
    };
  }

  renderHeader () {
    return (
      <Container kind="notification-header" grow="1">
        <Container kind="notification-header-row">
          <Button
            glyph={this.props.dnd === 'true' ? 'toggle-on' : 'toggle-off'}
            text="Ne pas me déranger"
            kind="notification"
            onClick={() => this.doAs ('laboratory', 'toggle-dnd')}
          />
        </Container>
        <Container kind="notification-header-row">
          <Button
            glyph="toggle-off"
            text="Seulement les nouvelles"
            kind="notification"
          />
          <Label grow="1" />
          <Button
            text="Tout effacer"
            kind="notification"
            onClick={() => this.doAs ('laboratory', 'remove-notifications')}
          />
        </Container>
      </Container>
    );
  }

  renderNotification (data, keyIndex) {
    return (
      <Notification
        key={keyIndex}
        data={data}
        onClick={() =>
          this.doAs ('laboratory', 'click-notification', {notification: data})}
        onDelete={() =>
          this.doAs ('laboratory', 'remove-notification', {notification: data})}
      />
    );
  }

  renderNotifications (notifications) {
    if (notifications.size === 0) {
      return null;
    }
    // The most recent notification first (on top).
    return this.shred (notifications)
      .reverse ()
      .select ((k, v) => v.toJS ())
      .map (this.renderNotification);
  }

  render () {
    const data = this.props.data;
    const show = this.props.show;
    const subkind = show === 'true' ? 'show' : 'hidden';
    if (!this.props.id) {
      return null;
    }

    return (
      <Container kind="notifications-panel" subkind={subkind} width="400px">
        {this.renderHeader ()}
        <Container kind="notifications">
          {this.renderNotifications (data)}
        </Container>
      </Container>
    );
  }
}

/******************************************************************************/
export default Notifications;
