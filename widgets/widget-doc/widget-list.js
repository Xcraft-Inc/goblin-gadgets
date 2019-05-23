import Button from 'goblin-gadgets/widgets/button/widget';
import Label from 'goblin-gadgets/widgets/label/widget';
import buttonProps from 'goblin-gadgets/widgets/button/props';
import labelProps from 'goblin-gadgets/widgets/label/props';

export default [
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
];
