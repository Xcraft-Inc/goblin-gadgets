import props from './props';
import scenarios from './scenarios';
import {registerWidget} from 'goblin-gadgets/widgets/widget-doc/widget-list';
import TextInputInfoNC from '../text-input-info-nc/widget';
import wrapRawInput from 'goblin-gadgets/widgets/input-wrapper/widget.js';

const TextFieldNC = wrapRawInput(TextInputInfoNC);
TextFieldNC.displayName = 'TextFieldNC';

export default TextFieldNC;

/******************************************************************************/

registerWidget(TextFieldNC, props, scenarios);
