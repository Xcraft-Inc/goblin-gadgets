import CheckboxInput from '../checkbox-input/widget';
import withC from 'goblin-laboratory/widgets/connect-helpers/with-c';

const CheckboxField = withC(CheckboxInput, {checked: 'onChange'});
CheckboxField.displayName = 'CheckboxField';
export default CheckboxField;
