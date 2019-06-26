import Button from 'goblin-gadgets/widgets/button/widget';
import buttonProps from 'goblin-gadgets/widgets/button/props';
import buttonScenarios from 'goblin-gadgets/widgets/button/scenarios';

import Label from 'goblin-gadgets/widgets/label/widget';
import labelProps from 'goblin-gadgets/widgets/label/props';
import labelScenarios from 'goblin-gadgets/widgets/label/scenarios';

import Container from 'goblin-gadgets/widgets/container/widget';
import containerProps from 'goblin-gadgets/widgets/container/props';
import containerScenarios from 'goblin-gadgets/widgets/container/scenarios';

import LabelRow from 'goblin-gadgets/widgets/label-row/widget';
import labelRowProps from 'goblin-gadgets/widgets/label-row/props';

import HinterFieldNC from 'goblin-gadgets/widgets/hinter-field-nc/widget';
import hinterFieldNCProps from 'goblin-gadgets/widgets/hinter-field-nc/props';
import hinterFieldNCScenarios from 'goblin-gadgets/widgets/hinter-field-nc/scenarios';

import TextFieldTypedNC from 'goblin-gadgets/widgets/text-field-typed-nc/widget';
import textFieldTypedNCProps from 'goblin-gadgets/widgets/text-field-typed-nc/props';

import TextFieldNC from 'goblin-gadgets/widgets/text-field-nc/widget';
import textFieldNCProps from 'goblin-gadgets/widgets/text-field-nc/props';

import TextInputNC from 'goblin-gadgets/widgets/text-input-nc/widget';
import textInputNCProps from 'goblin-gadgets/widgets/text-input-nc/props';

import CheckboxNC from 'goblin-gadgets/widgets/checkbox-nc/widget';
import checkboxNCProps from 'goblin-gadgets/widgets/checkbox-nc/props';
import checkboxNCScenarios from 'goblin-gadgets/widgets/checkbox-nc/scenarios';

import Table from 'goblin-gadgets/widgets/table/widget';
import tableProps from 'goblin-gadgets/widgets/table/props';

import Gauge from 'goblin-gadgets/widgets/gauge/widget';
import gaugeProps from 'goblin-gadgets/widgets/gauge/props';

const widgetList = [
  {
    name: 'Button',
    widget: Button,
    widgetPath: 'goblin-gadgets/widgets/button/widget',
    props: buttonProps,
    scenarios: buttonScenarios,
  },
  {
    name: 'Label',
    widget: Label,
    widgetPath: 'goblin-gadgets/widgets/label/widget',
    props: labelProps,
    scenarios: labelScenarios,
  },
  {
    name: 'Container',
    widget: Container,
    widgetPath: 'goblin-gadgets/widgets/container/widget',
    props: containerProps,
    scenarios: containerScenarios,
  },
  {
    name: 'LabelRow',
    widget: LabelRow,
    widgetPath: 'goblin-gadgets/widgets/label-row/widget',
    props: labelRowProps,
  },
  {
    name: 'HinterFieldNC',
    widget: HinterFieldNC,
    widgetPath: 'goblin-gadgets/widgets/hinter-field-nc/widget',
    props: hinterFieldNCProps,
    scenarios: hinterFieldNCScenarios,
  },
  {
    name: 'TextFieldTypedNC',
    widget: TextFieldTypedNC,
    widgetPath: 'goblin-gadgets/widgets/text-field-typed-nc/widget',
    props: textFieldTypedNCProps,
  },
  {
    name: 'TextFieldNC',
    widget: TextFieldNC,
    widgetPath: 'goblin-gadgets/widgets/text-field-nc/widget',
    props: textFieldNCProps,
  },
  {
    name: 'TextInputNC',
    widget: TextInputNC,
    widgetPath: 'goblin-gadgets/widgets/text-input-nc/widget',
    props: textInputNCProps,
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
    props: checkboxNCProps,
    scenarios: checkboxNCScenarios,
  },
  {
    name: 'Gauge',
    widget: Gauge,
    widgetPath: 'goblin-gadgets/widgets/gauge/widget',
    props: gaugeProps,
  },
];

export default widgetList;
export function registerWidget(widgetDefinition) {
  widgetList.push(widgetDefinition);
}
