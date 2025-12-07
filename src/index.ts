// Export the main Form component
export { Form, default as FormDefault } from "./components/Form/Form";

// Export context hook
export { useFormContext, FormProvider } from "./components/Form/FormContext";

// Export all types
export type {
    FormProps,
    FormFieldProps,
    FormButtonsProps,
    BaseFormInputProps,
    FormInputProps,
    InputTypeConfig,
    StyleConfig,
    LabelConfig,
    ValidationConfig,
    LayoutConfig,
    TextInputConfig,
    EmailInputConfig,
    PasswordInputConfig,
    NumberInputConfig,
    SearchInputConfig,
    UrlInputConfig,
    TelInputConfig,
    DropdownInputConfig,
    TextareaInputConfig,
    CheckboxInputConfig,
    OTPInputConfig,
    PhoneInputConfig,
    DateInputConfig,
    FileInputConfig,
    PhoneData,
    BaseInputConfig,
    ExtractTypeConfig,
    FormFieldWrapperProps,
} from "./components/Form/types";

// Export utilities
export { cn } from "./utils/cn";
