import { Group, Input, FormInputLabel } from "./FormInput.styles";

const FormInput = ({label,...otherProps})=>{
    return (
        <Group>
            <Input {...otherProps}/>
            {label && (
                <FormInputLabel shrink = {otherProps.value.length ? true : false}>
                    {label}
                </FormInputLabel>
            )}
        </Group>
    );
}

export default FormInput;