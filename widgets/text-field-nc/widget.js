import Props from './props';
import TextInputInfoNC from '../text-input-info-nc/widget';
import wrapRawInput from 'goblin-laboratory/widgets/input-wrapper/widget.js';
import {
  makePropTypes,
  makeDefaultProps,
} from 'xcraft-core-utils/lib/prop-types';

const TextFieldNC = wrapRawInput(TextInputInfoNC);
TextFieldNC.displayName = 'TextFieldNC';

export default TextFieldNC;

/******************************************************************************/

TextFieldNC.propTypes = makePropTypes(Props);
TextFieldNC.defaultProps = makeDefaultProps(Props);
