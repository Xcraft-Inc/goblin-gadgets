import TextFieldNC from '../TextField-nc/widget';
import withC from 'goblin-laboratory/widgets/connect-helpers/with-c';

const TextField = withC(TextFieldNC, {value: 'onChange'});
TextField.displayName = 'TextFieldNew';
export default TextField;
