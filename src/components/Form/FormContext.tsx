import { createContext, useContext, ReactNode } from "react";
import { type Control, FieldErrors, FieldValues } from "react-hook-form";

interface FormContextValue<T extends FieldValues = FieldValues> {
    control: Control<T>;
    errors: FieldErrors<T>;
}

// Use unknown instead of any for better type safety
const FormContext = createContext<FormContextValue<FieldValues> | null>(null);

export const useFormContext = <T extends FieldValues = FieldValues>() => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("Form components must be used within a Form component");
    }
    // Safe cast because we know the structure matches
    return context as unknown as FormContextValue<T>;
};

// Create a custom provider component
export const FormProvider = <T extends FieldValues = FieldValues>({
    children,
    value,
}: {
    children: ReactNode;
    value: FormContextValue<T>;
}) => {
    return (
        <FormContext.Provider value={value as FormContextValue<FieldValues>}>
            {children}
        </FormContext.Provider>
    );
};
