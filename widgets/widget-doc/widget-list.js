import Button from 'goblin-gadgets/widgets/button/widget';
import buttonProps from 'goblin-gadgets/widgets/button/props';

import Label from 'goblin-gadgets/widgets/label/widget';
import labelProps from 'goblin-gadgets/widgets/label/props';

import Container from 'goblin-gadgets/widgets/container/widget';
import containerProps from 'goblin-gadgets/widgets/container/props';

import TextFieldBasis from 'goblin-gadgets/widgets/text-field-basis/widget';
import textFieldBasisProps from 'goblin-gadgets/widgets/text-field-basis/props';

import CheckboxInput from 'goblin-gadgets/widgets/checkbox-input/widget';
import CheckboxInputProps from 'goblin-gadgets/widgets/checkbox-input/props';

import Table from 'goblin-gadgets/widgets/table/widget';
import tableProps from 'goblin-gadgets/widgets/table/props';

import Gauge from 'goblin-gadgets/widgets/gauge/widget';
import GaugeProps from 'goblin-gadgets/widgets/gauge/props';

const widgetList = [
  {
    name: 'Button',
    widget: Button,
    widgetPath: 'goblin-gadgets/widgets/button/widget',
    props: buttonProps,
  },
  {
    name: 'Label',
    widget: Label,
    widgetPath: 'goblin-gadgets/widgets/label/widget',
    props: labelProps,
  },
  {
    name: 'Container',
    widget: Container,
    widgetPath: 'goblin-gadgets/widgets/container/widget',
    props: containerProps,
  },
  {
    name: 'TextFieldBasis',
    widget: TextFieldBasis,
    widgetPath: 'goblin-gadgets/widgets/text-field-basis/widget',
    props: textFieldBasisProps,
  },
  {
    name: 'Table',
    widget: Table,
    widgetPath: 'goblin-gadgets/widgets/table/widget',
    props: tableProps,
  },
  {
    name: 'CheckboxInput',
    widget: CheckboxInput,
    widgetPath: 'goblin-gadgets/widgets/checkbox-input/widget',
    props: CheckboxInputProps,
  },
  {
    name: 'Gauge',
    widget: Gauge,
    widgetPath: 'goblin-gadgets/widgets/gauge/widget',
    props: GaugeProps,
  },
];

export default widgetList;
export function registerWidget(widgetDefinition) {
  widgetList.push(widgetDefinition);
}
