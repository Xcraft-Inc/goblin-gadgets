import TextInputInfoNC from '../text-input-info-nc/widget';
import wrapRawInput from 'goblin-laboratory/widgets/input-wrapper/widget.js';

const TextFieldNC = wrapRawInput(TextInputInfoNC);
TextFieldNC.displayName = 'TextFieldNC';

export default TextFieldNC;
