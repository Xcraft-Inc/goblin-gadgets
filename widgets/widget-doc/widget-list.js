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
import labelRowScenarios from 'goblin-gadgets/widgets/label-row/scenarios';

import HinterFieldNC from 'goblin-gadgets/widgets/hinter-field-nc/widget';
import hinterFieldNCProps from 'goblin-gadgets/widgets/hinter-field-nc/props';
import hinterFieldNCScenarios from 'goblin-gadgets/widgets/hinter-field-nc/scenarios';

import TextFieldComboNC from 'goblin-gadgets/widgets/text-field-combo-nc/widget';
import textFieldComboNCProps from 'goblin-gadgets/widgets/text-field-combo-nc/props';
import textFieldComboNCScenarios from 'goblin-gadgets/widgets/text-field-combo-nc/scenarios';

import TextFieldTypedNC from 'goblin-gadgets/widgets/text-field-typed-nc/widget';
import textFieldTypedNCProps from 'goblin-gadgets/widgets/text-field-typed-nc/props';
import textFieldTypedNCScenarios from 'goblin-gadgets/widgets/text-field-typed-nc/scenarios';

import TextFieldNC from 'goblin-gadgets/widgets/text-field-nc/widget';
import textFieldNCProps from 'goblin-gadgets/widgets/text-field-nc/props';
import textFieldNCScenarios from 'goblin-gadgets/widgets/text-field-nc/scenarios';

import TextInputNC from 'goblin-gadgets/widgets/text-input-nc/widget';
import textInputNCProps from 'goblin-gadgets/widgets/text-input-nc/props';
import textInputNCScenarios from 'goblin-gadgets/widgets/text-input-nc/scenarios';

import CheckboxNC from 'goblin-gadgets/widgets/checkbox-nc/widget';
import checkboxNCProps from 'goblin-gadgets/widgets/checkbox-nc/props';
import checkboxNCScenarios from 'goblin-gadgets/widgets/checkbox-nc/scenarios';

import Table from 'goblin-gadgets/widgets/table/widget';
import tableProps from 'goblin-gadgets/widgets/table/props';
import tableScenarios from 'goblin-gadgets/widgets/table/scenarios';

import Gauge from 'goblin-gadgets/widgets/gauge/widget';
import gaugeProps from 'goblin-gadgets/widgets/gauge/props';
import gaugeScenarios from 'goblin-gadgets/widgets/gauge/scenarios';

import Calendar from 'goblin-gadgets/widgets/calendar/widget';
import calendarProps from 'goblin-gadgets/widgets/calendar/props';
import calendarScenarios from 'goblin-gadgets/widgets/calendar/scenarios';

import Carousel from 'goblin-gadgets/widgets/carousel/widget';
import carouselProps from 'goblin-gadgets/widgets/carousel/props';
import carouselScenarios from 'goblin-gadgets/widgets/carousel/scenarios';

import Triangle from 'goblin-gadgets/widgets/triangle/widget';
import triangleProps from 'goblin-gadgets/widgets/triangle/props';
import triangleScenarios from 'goblin-gadgets/widgets/triangle/scenarios';

import ChatBalloon from 'goblin-gadgets/widgets/chat-balloon/widget';
import chatBalloonProps from 'goblin-gadgets/widgets/chat-balloon/props';
import chatBalloonScenarios from 'goblin-gadgets/widgets/chat-balloon/scenarios';

import DocumentContainer from 'goblin-gadgets/widgets/document-container/widget';
import documentContainerProps from 'goblin-gadgets/widgets/document-container/props';
import documentContainerScenarios from 'goblin-gadgets/widgets/document-container/scenarios';

import AnalogClock from 'goblin-gadgets/widgets/analog-clock/widget';
import analogClockProps from 'goblin-gadgets/widgets/analog-clock/props';
import analogClockScenarios from 'goblin-gadgets/widgets/analog-clock/scenarios';

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
    scenarios: labelRowScenarios,
  },
  {
    name: 'HinterFieldNC',
    widget: HinterFieldNC,
    widgetPath: 'goblin-gadgets/widgets/hinter-field-nc/widget',
    props: hinterFieldNCProps,
    scenarios: hinterFieldNCScenarios,
  },
  {
    name: 'TextFieldComboNC',
    widget: TextFieldComboNC,
    widgetPath: 'goblin-gadgets/widgets/text-field-combo-nc/widget',
    props: textFieldComboNCProps,
    scenarios: textFieldComboNCScenarios,
  },
  {
    name: 'TextFieldTypedNC',
    widget: TextFieldTypedNC,
    widgetPath: 'goblin-gadgets/widgets/text-field-typed-nc/widget',
    props: textFieldTypedNCProps,
    scenarios: textFieldTypedNCScenarios,
  },
  {
    name: 'TextFieldNC',
    widget: TextFieldNC,
    widgetPath: 'goblin-gadgets/widgets/text-field-nc/widget',
    props: textFieldNCProps,
    scenarios: textFieldNCScenarios,
  },
  {
    name: 'TextInputNC',
    widget: TextInputNC,
    widgetPath: 'goblin-gadgets/widgets/text-input-nc/widget',
    props: textInputNCProps,
    scenarios: textInputNCScenarios,
  },
  {
    name: 'Table',
    widget: Table,
    widgetPath: 'goblin-gadgets/widgets/table/widget',
    props: tableProps,
    scenarios: tableScenarios,
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
    scenarios: gaugeScenarios,
  },
  {
    name: 'Calendar',
    widget: Calendar,
    widgetPath: 'goblin-gadgets/widgets/calendar/widget',
    props: calendarProps,
    scenarios: calendarScenarios,
  },
  {
    name: 'Carousel',
    widget: Carousel,
    widgetPath: 'goblin-gadgets/widgets/carousel/widget',
    props: carouselProps,
    scenarios: carouselScenarios,
  },
  {
    name: 'Triangle',
    widget: Triangle,
    widgetPath: 'goblin-gadgets/widgets/triangle/widget',
    props: triangleProps,
    scenarios: triangleScenarios,
  },
  {
    name: 'ChatBalloon',
    widget: ChatBalloon,
    widgetPath: 'goblin-gadgets/widgets/chat-balloon/widget',
    props: chatBalloonProps,
    scenarios: chatBalloonScenarios,
  },
  {
    name: 'DocumentContainer',
    widget: DocumentContainer,
    widgetPath: 'goblin-gadgets/widgets/document-container/widget',
    props: documentContainerProps,
    scenarios: documentContainerScenarios,
  },
  {
    name: 'AnalogClock',
    widget: AnalogClock,
    widgetPath: 'goblin-gadgets/widgets/analog-clock/widget',
    props: analogClockProps,
    scenarios: analogClockScenarios,
  },
];

export default widgetList;
export function registerWidget(widgetDefinition) {
  widgetList.push(widgetDefinition);
}
