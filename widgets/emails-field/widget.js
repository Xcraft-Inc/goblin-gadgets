import React from 'react';
import PropTypes from 'prop-types';
import Widget from 'goblin-laboratory/widgets/widget';
import withC from 'goblin-laboratory/widgets/connect-helpers/with-c';
import C from 'goblin-laboratory/widgets/connect-helpers/c';
import {TranslatableInput} from 'goblin-nabu/widgets/helpers/element-helpers';
import * as styles from './styles';

/******************************************************************************/

function isValidEmail(value) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
}

function toArray(value) {
  if (!value) {
    return [];
  }
  if (value.toArray) {
    return value.toArray();
  }
  return Array.isArray(value) ? value : Object.values(value);
}

class EmailsFieldNC extends Widget {
  constructor() {
    super(...arguments);
    this.styles = styles;
    this.input = null;
    this.state = {
      draft: '',
      wrong: false,
    };

    this.addDraft = this.addDraft.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.removeEmail = this.removeEmail.bind(this);
    this.setInput = this.setInput.bind(this);
  }

  get emails() {
    return Array.isArray(this.props.value)
      ? this.props.value.filter((email) => typeof email === 'string')
      : [];
  }

  setInput(input) {
    this.input = input;
  }

  changeEmails(emails) {
    if (this.props.onChange) {
      this.props.onChange(emails);
    }
  }

  addCandidates(candidates) {
    const emails = [...this.emails];
    const knownEmails = new Set(emails.map((email) => email.toLowerCase()));
    const invalidCandidates = [];

    for (const candidate of candidates) {
      const email = candidate.trim();
      if (!email) {
        continue;
      }
      if (!isValidEmail(email)) {
        invalidCandidates.push(email);
        continue;
      }
      const normalizedEmail = email.toLowerCase();
      if (!knownEmails.has(normalizedEmail)) {
        emails.push(email);
        knownEmails.add(normalizedEmail);
      }
    }

    if (emails.length !== this.emails.length) {
      this.changeEmails(emails);
    }

    return invalidCandidates;
  }

  addDraft() {
    const invalidCandidates = this.addCandidates([this.state.draft]);
    this.setState({
      draft: invalidCandidates.join('; '),
      wrong: invalidCandidates.length > 0,
    });
  }

  handleChange(event) {
    const value = event.target.value;
    if (!value.includes(';')) {
      this.setState({draft: value, wrong: false});
      return;
    }

    const candidates = value.split(';');
    const draft = candidates.pop();
    const invalidCandidates = this.addCandidates(candidates);
    const remainingDraft = [...invalidCandidates, draft]
      .filter((candidate) => candidate.length > 0)
      .join('; ');
    this.setState({
      draft: remainingDraft,
      wrong: invalidCandidates.length > 0,
    });
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addDraft();
    }
  }

  handleBlur() {
    if (this.state.draft.trim()) {
      this.addDraft();
    }
  }

  removeEmail(emailToRemove) {
    this.changeEmails(this.emails.filter((email) => email !== emailToRemove));
  }

  renderTag(email) {
    return (
      <span className={this.styles.classNames.tag} key={email}>
        <span className={this.styles.classNames.tagText}>{email}</span>
        {!this.props.readonly && !this.props.disabled ? (
          <button
            className={this.styles.classNames.removeButton}
            type="button"
            aria-label={`Supprimer ${email}`}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => this.removeEmail(email)}
          >
            ×
          </button>
        ) : null}
      </span>
    );
  }

  render() {
    const classNames = [this.styles.classNames.field];
    if (this.state.wrong) {
      classNames.push(this.styles.classNames.wrong);
    }
    if (this.props.readonly || this.props.disabled) {
      classNames.push(this.styles.classNames.readonly);
    }

    return (
      <div
        className={classNames.join(' ')}
        onClick={() => this.input && this.input.focus()}
      >
        {this.emails.map((email) => this.renderTag(email))}
        {!this.props.readonly && !this.props.disabled ? (
          <TranslatableInput
            workitemId={this.context.desktopId || this.getNearestId()}
            inputRef={this.setInput}
            className={this.styles.classNames.input}
            type="email"
            value={this.state.draft}
            placeholder={this.emails.length === 0 ? this.props.hintText : ''}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
        ) : null}
      </div>
    );
  }
}

/******************************************************************************/

const EmailsField = withC(EmailsFieldNC, {value: 'onChange'});
EmailsField.displayName = 'EmailsField';

const ConnectedEmailsField = (props) => {
  let {value, model, ...otherProps} = props;
  if (model) {
    value = C(model, toArray);
  }
  return <EmailsField {...otherProps} value={value || []} />;
};

ConnectedEmailsField.propTypes = {
  model: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default ConnectedEmailsField;
