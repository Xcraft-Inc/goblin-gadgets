//T:2019-02-27
import React from 'react';
import Form from 'laboratory/form';

import DialogModal from 'gadgets/dialog-modal/widget';
import Container from 'gadgets/container/widget';
import Button from 'gadgets/button/widget';
import Label from 'gadgets/label/widget';
import LabelTextField from 'gadgets/label-text-field/widget';
import Separator from 'gadgets/separator/widget';
import T from 't';

/******************************************************************************/

class LoginDialog extends Form {
  constructor() {
    super(...arguments);
    this.error = null;

    this.onOk = this.onOk.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  static get wiring() {
    return {
      id: 'id',
      user: 'user',
      password: 'password',
      error: 'error',
      close: 'close',
    };
  }

  clearFields() {
    this.setModelValue('.user', null);
    this.setModelValue('.password', null);
  }

  onClose() {
    const x = this.props.closeDialog;
    if (x) {
      x();
    }
  }

  onOk() {
    this.submit();
  }

  onCancel() {
    this.do('logout');
    this.onClose();
  }

  render() {
    if (this.props.close) {
      this.do('reset');
      this.onClose();
      return null;
    }

    const Form = this.Form;
    return (
      <DialogModal width="400px" height="320px">
        <Form {...this.formConfig}>
          <Container kind="row-pane">
            <Label text={T('Identifiez-vous')} grow="1" kind="big-center" />
          </Container>
          <Separator kind="space" height="30px" />
          <Container kind="row-pane">
            <LabelTextField
              model=".user"
              defaultFocus="true"
              labelGlyph="solid/user"
              hintText={T("Nom d'utilisateur")}
              grow="1"
            />
          </Container>
          <Container kind="row-pane">
            <LabelTextField
              model=".password"
              labelGlyph="solid/lock"
              hintText={T('Mot de passe')}
              type="password"
              grow="1"
            />
          </Container>
          <Separator kind="space" height="20px" />
          <Label kind="center-to-box" height="20px" text={this.props.error} />
          <Separator kind="space" height="50px" />
          <Container kind="row-pane">
            <Button
              glyph="solid/check"
              text={T('Se connecter')}
              grow="1"
              kind="action"
              place="1/2"
              onClick={this.onOk}
            />
            <Button
              glyph="solid/times"
              text={T('Annuler')}
              grow="1"
              kind="action"
              place="2/2"
              onClick={this.onCancel}
            />
          </Container>
        </Form>
      </DialogModal>
    );
  }
}

/******************************************************************************/
export default LoginDialog;
