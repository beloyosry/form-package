import { FieldValues } from "react-hook-form";
import { FormInputProps } from "./types";
import { useFormContext } from "./FormContext";
import { FormBaseInput } from "./FormBaseInput";

export const FormInputWrapper = <T extends FieldValues = FieldValues>(
    props: FormInputProps<T>
) => {
    const { control, errors } = useFormContext<T>();
    const { name, validation, ...rest } = props;

    // Get error for this field from context
    const error = errors[name]?.message as string | undefined;

    return (
        <FormBaseInput
            {...rest}
            name={name}
            control={control}
            validation={{
                ...validation,
                error,
            }}
        />
    );
};
