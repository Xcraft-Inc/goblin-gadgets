import Button from 'goblin-gadgets/widgets/button/widget';
import buttonProps from 'goblin-gadgets/widgets/button/props';

import Label from 'goblin-gadgets/widgets/label/widget';
import labelProps from 'goblin-gadgets/widgets/label/props';

import Container from 'goblin-gadgets/widgets/container/widget';
import containerProps from 'goblin-gadgets/widgets/container/props';

import TextInputNC from 'goblin-gadgets/widgets/text-input-nc/widget';
import TextInputNCProps from 'goblin-gadgets/widgets/text-input-nc/props';

import CheckboxNC from 'goblin-gadgets/widgets/checkbox-nc/widget';
import CheckboxNCProps from 'goblin-gadgets/widgets/checkbox-nc/props';

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
    name: 'TextInputNC',
    widget: TextInputNC,
    widgetPath: 'goblin-gadgets/widgets/text-input-nc/widget',
    props: TextInputNCProps,
  },
  {
    name: 'Table',
    widget: Table,
    widgetPath: 'goblin-gadgets/widgets/table/widget',
    props: tableProps,
  },
  {
    name: 'CheckboxNC',
    widget: CheckboxNC,
    widgetPath: 'goblin-gadgets/widgets/checkbox-nc/widget',
    props: CheckboxNCProps,
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
