import React from 'react';
import Widget from 'laboratory/widget';
import Form from 'laboratory/form';

import DialogModal from 'gadgets/dialog-modal/widget';
import Container from 'gadgets/container/widget';
import Button from 'gadgets/button/widget';
import Label from 'gadgets/label/widget';
import LabelTextField from 'gadgets/label-text-field/widget';
import Separator from 'gadgets/separator/widget';

/******************************************************************************/

class LoginDialog extends Form {
  constructor () {
    super (...arguments);
  }

  static get wiring () {
    return {
      id: 'id',
    };
  }

  onClose () {
    const x = this.props.closeDialog;
    if (x) {
      x ();
    }
  }

  onOk () {
    this.onClose ();
  }

  onCancel () {
    this.onClose ();
  }

  render () {
    const Form = this.Form;
    return (
      <DialogModal width="400px" height="300px">
        <Form {...this.formConfig}>
          <Container kind="row-pane">
            <Label text="Identifiez-vous" grow="1" kind="big-center" />
          </Container>
          <Separator kind="space" height="30px" />
          <Container kind="row-pane">
            <LabelTextField
              model=".user"
              labelGlyph="user"
              hintText="Nom d´utilisateur"
              grow="1"
            />
          </Container>
          <Container kind="row-pane">
            <LabelTextField
              model=".password"
              labelGlyph="lock"
              hintText="Mot de passe"
              type="password"
              grow="1"
            />
          </Container>
          <Separator kind="space" height="50px" />
          <Container kind="row-pane">
            <Button
              glyph="check"
              text="Se connecter"
              grow="1"
              kind="action"
              place="1/2"
              onClick={::this.onOk}
            />
            <Button
              glyph="close"
              text="Annuler"
              grow="1"
              kind="action"
              place="2/2"
              onClick={::this.onCancel}
            />
          </Container>
        </Form>
      </DialogModal>
    );
  }
}

/******************************************************************************/
export default LoginDialog;
