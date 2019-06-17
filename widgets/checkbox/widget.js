import CheckboxNC from '../checkbox-nc/widget';
import withC from 'goblin-laboratory/widgets/connect-helpers/with-c';

const Checkbox = withC(CheckboxNC, {checked: 'onChange'});
Checkbox.displayName = 'Checkbox';
export default Checkbox;
