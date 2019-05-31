import React from 'react';
import Widget from 'laboratory/widget';
import Container from 'goblin-gadgets/widgets/container/widget';
import TextFieldBasis from 'goblin-gadgets/widgets/text-field-basis/widget';
import TextFieldCombo from 'goblin-gadgets/widgets/text-field-combo/widget';
import Button from 'goblin-gadgets/widgets/button/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import {isShredder} from 'xcraft-core-shredder';

/******************************************************************************/

const List = {
  color: [
    '',
    'base',
    'primary',
    'secondary',
    'success',
    'pick',
    'drop',
    'task',
    'white',
    'lightgrey',
    'grey',
    'black',
    'red',
    'green',
    'blue',
    'yellow',
    {text: '#d2e6f9 — light blue', value: '#d2e6f9'},
    {text: '#8ab6df — blue', value: '#8ab6df'},
    {text: '#f5ddb8 — light orange', value: '#f5ddb8'},
    {text: '#fbce89 — orange', value: '#fbce89'},
    {text: '#c6f7da — light green', value: '#c6f7da'},
    {text: '#74f7a9 — green', value: '#74f7a9'},
  ],
  glyph: [
    '',
    'solid/check',
    'solid/times',
    'solid/bicycle',
    'solid/car',
    'solid/rocket',
    'solid/calendar',
  ],
  size: [
    '',
    '0px',
    '1px',
    '2px',
    '10px',
    '20px',
    '32px',
    '50px',
    '100px',
    '200px',
    '300px',
    '500px',
  ],
  component: ['short-text', 'long-text', 'button', 'button-10'],
  function: ['alert', 'log'],
  shape: [
    '',
    'rounded',
    'left-rounded',
    'right-rounded',
    'left-smooth',
    'right-smooth',
  ],
  angle: ['', '90', '180', '270'],
  percentage: ['', '50%', '75%', '100%', '150%', '200%'],
  spacing: ['', 'overlap', 'tiny', 'large', 'double'],
  shortcut: ['', '_ctrl_+A', '_shift_+A', '_alt_+A'],
  grow: ['', '0.5', '1'],
  fontStyle: ['', 'italic', 'oblique'],
  cursor: [
    '',
    'default',
    'none',
    'pointer',
    'cell',
    'crosshair',
    'text',
    'move',
    'not-allowed',
    'ew-resize',
    'ns-resize',
    'grab',
  ],
  fontWeight: ['', 'bold', 'bolder', 'lighter'],
  textTransform: ['', 'capitalize', 'uppercase', 'lowercase'],
  justify: ['', 'start', 'center', 'end', 'around', 'between', 'none'],
  dataTable: [
    {
      text: 'Petite table',
      value: {
        header: [
          {
            name: 'content',
            description: 'Type',
            width: '100px',
            textAlign: 'left',
          },
          {
            name: 'dimensions',
            description: 'Dimensions',
            width: '200px',
            textAlign: 'left',
          },
          {
            name: 'weight',
            description: 'Poids',
            width: '100px',
            textAlign: 'right',
          },
        ],
        rows: [
          {
            content: 'C6',
            dimensions: '11.4x16.2x1',
            weight: '150g',
          },
          {
            content: 'A4',
            dimensions: '21x29.7x1',
            weight: '100g',
          },
          {
            content: 'XT9',
            dimensions: '50x50x100',
            weight: '1kg',
          },
          {
            content: 'N1',
            dimensions: '1x2x3',
            weight: '10g',
          },
        ],
      },
    },
    {
      text: 'Moyenne table',
      value: {
        'post-header': [
          {
            names: ['lu', 'ma', 'me', 'je', 've'],
            description: 'Ouvrable',
            textAlign: 'center',
          },
          {
            names: ['sa', 'di'],
            description: 'Week-end',
            textAlign: 'center',
          },
        ],
        header: [
          {
            name: 'lu',
            description: 'Lundi',
            grow: '1',
            textAlign: 'right',
          },
          {
            name: 'ma',
            description: 'Mardi',
            grow: '1',
            textAlign: 'right',
          },
          {
            name: 'me',
            description: 'Mercredi',
            grow: '1',
            textAlign: 'right',
          },
          {
            name: 'je',
            description: 'Jeudi',
            grow: '1',
            textAlign: 'right',
          },
          {
            name: 've',
            description: 'Vendredi',
            grow: '1',
            textAlign: 'right',
          },
          {
            name: 'sa',
            description: 'Samedi',
            grow: '1',
            textAlign: 'right',
          },
          {
            name: 'di',
            description: 'Dimanche',
            grow: '1',
            textAlign: 'right',
          },
        ],
        rows: [
          {
            lu: '10.00',
            ma: '12.00',
            me: '10.00',
            je: '10.00',
            ve: '19.00',
            sa: '5.00',
            di: '100.00',
          },
          {
            lu: '120.00',
            ma: '150.00',
            je: '100.00',
            ve: '20.00',
            di: '2.00',
          },
          {
            lu: '5.00',
            ma: '50.00',
            me: '51.00',
            je: '34.00',
            ve: '7.00',
            sa: '65.00',
          },
        ],
      },
    },
    {
      text: 'Grande table',
      value: {
        header: [
          {
            name: 'description',
            description: 'Description',
            grow: '5',
            textAlign: 'left',
          },
          {
            name: 'quantity',
            description: 'Quantité',
            grow: '1',
            textAlign: 'right',
          },
          {
            name: 'unit',
            description: 'Unité',
            grow: '1',
            textAlign: 'left',
          },
          {
            name: 'pricePerUnit',
            description: 'Prix',
            grow: '1',
            textAlign: 'right',
          },
          {
            name: 'discount',
            description: 'Rabais',
            grow: '1',
            textAlign: 'right',
          },
          {
            name: 'finalPrice',
            description: 'Total',
            grow: '1',
            textAlign: 'right',
          },
        ],
        rows: [
          {
            description: 'Crésus Comptabilité PRO',
            quantity: '1',
            unit: 'pce',
            pricePerUnit: '480.00',
            finalPrice: '480.00',
          },
          {
            description: 'Crésus Facturation PRO',
            quantity: '200',
            unit: 'pce',
            pricePerUnit: '480.00',
            discount: '100.00',
            finalPrice: '95900.00',
          },
          {
            description: 'Formation compabilité mardi 10.02.2017',
            quantity: '4.5',
            unit: 'h',
            pricePerUnit: '150.00',
            finalPrice: '675.00',
          },
          {
            description: 'Dépannage ticket #30.205',
            quantity: '1',
            pricePerUnit: '100.00',
            discount: '10%',
            finalPrice: '90.00',
          },
          {
            description: 'Vis M12',
            quantity: '200',
            unit: 'pce',
            pricePerUnit: '0.30',
            finalPrice: '60.00',
          },
          {
            description:
              'Description débile super longue pour tester la mise en page lorsque le texte est très long, voilà voilà...',
            quantity: '1',
            pricePerUnit: '5.00',
            finalPrice: '5.00',
          },
          {
            description: 'Huile de coude extra-forte',
            quantity: '2.5',
            unit: 'dl',
            pricePerUnit: '10.00',
            finalPrice: '250.00',
          },
        ],
      },
    },
  ],
};

/******************************************************************************/

class WidgetDocPropertyControl extends Widget {
  constructor() {
    super(...arguments);
    this.onChange = this.onChange.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onCheckButtonClick = this.onCheckButtonClick.bind(this);
    this.clear = this.clear.bind(this);
  }

  onChange(value) {
    this.dispatch({type: 'SET', path: this.props.path, value});
  }

  onChangeNumber(value) {
    this.onChange(Number(value));
  }

  onCheckButtonClick() {
    this.onChange(!this.props.value);
  }

  clear() {
    this.dispatch({type: 'DEL', path: this.props.path});
  }

  /******************************************************************************/

  renderCombo(list, readonly) {
    let value = list.find(item => {
      if (isShredder(this.props.value)) {
        const x = JSON.stringify(item.value, null, 1);
        const y = JSON.stringify(this.props.value.toJS(), null, 1);
        return x === y;
      } else if (typeof item === 'object') {
        return item.value === this.props.value;
      } else {
        return item === this.props.value;
      }
    });
    if (typeof value === 'object') {
      value = value.text;
    }
    return (
      <React.Fragment>
        <TextFieldBasis
          shape="left-smooth"
          spacing="overlap"
          readonly={readonly}
          value={value}
          onChange={readonly ? null : this.onChange}
          grow="1"
        />
        <TextFieldCombo
          spacing="tiny"
          list={list}
          defaultValue={value}
          onSetText={this.onChange}
          menuType="wrap"
          menuItemWidth="200px"
        />
      </React.Fragment>
    );
  }

  renderControl() {
    const type = this.props.type.type;
    switch (type) {
      case 'bool':
        return (
          <React.Fragment>
            <Button
              width="32px"
              focusable="true"
              glyph={this.props.value ? 'solid/check' : null}
              onClick={this.onCheckButtonClick}
            />
            <Label grow="1" />
          </React.Fragment>
        );
      case 'enum':
        return this.renderCombo(this.props.type.values, true);
      case 'color':
      case 'glyph':
      case 'size':
      case 'component':
      case 'shortcut':
      case 'angle':
      case 'percentage':
      case 'fontWeight':
        return this.renderCombo(List[type], false);
      case 'function':
      case 'shape':
      case 'spacing':
      case 'grow':
      case 'fontStyle':
      case 'cursor':
      case 'textTransform':
      case 'justify':
      case 'dataTable':
        return this.renderCombo(List[type], true);
      case 'string':
      default:
        return (
          <TextFieldBasis
            spacing="tiny"
            shape="smooth"
            value={this.props.value}
            onChange={this.onChange}
            grow="1"
          />
        );
    }
  }

  render() {
    return (
      <Container kind="row">
        {this.renderControl()}
        <Button
          kind="combo"
          glyph="solid/eraser"
          onClick={this.clear}
          visibility={this.props.value !== undefined}
        />
      </Container>
    );
  }
}

/******************************************************************************/

export default Widget.connectWidget((state, props) => {
  return {
    value: state.get(props.path),
  };
})(WidgetDocPropertyControl);
