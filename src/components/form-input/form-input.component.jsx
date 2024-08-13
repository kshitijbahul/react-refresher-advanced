import {GroupContainer,Input, InputLabel} from './form-input.styles.jsx';

const FormInput = ({label, ...otherProps}) => {
    return (
            <GroupContainer>
                <Input {...otherProps}/>
                { 
                    label &&
                    <InputLabel shrink={otherProps.value.length} className={`${otherProps.value.length ? 'shirnk': ''} form-input-label`}>{label}</InputLabel>
                }
            </GroupContainer>
    );
}

export default FormInput;