import { FormEventHandler, ReactNode } from "react";
import { type Control, FieldValues, FieldErrors, Path } from "react-hook-form";

// ============================================
// Main Form Props
// ============================================
export interface FormProps<T extends FieldValues = FieldValues> {
    children: ReactNode;
    control: Control<T>;
    errors: FieldErrors<T>;
    onSubmit?: FormEventHandler;
    layout?: {
        className?: string;
        formClassName?: string;
        removeBorder?: boolean;
        noPadding?: boolean;
    };
}

// ============================================
// Form Field Props
// ============================================
export interface FormFieldProps {
    children: ReactNode;
    layout?: {
        title?: string;
        subtitle?: string;
        separator?: boolean;
        cols?: "1" | "2" | "3" | "4" | "5" | "6";
    };
    style?: {
        className?: string;
        titleClassName?: string;
        subtitleClassName?: string;
        separatorClassName?: string;
        gridClassName?: string;
    };
}

// ============================================
// Form Buttons Props
// ============================================
export interface FormButtonsProps {
    actions?: {
        submitText?: string;
        cancelText?: string;
        isLoading?: boolean;
        disabled?: boolean;
        removeCancel?: boolean;
        onConfirm?: () => void;
        onCancel?: () => void;
    };
    style?: {
        className?: string;
        childClassName?: string;
    };
}

// ============================================
// Form Field Wrapper Props
// ============================================
export interface FormFieldWrapperProps {
    children: React.ReactNode;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    successMessage?: string;
    hint?: string;
    className?: string;
    parentClassName?: string;
    labelClassName?: string;
    errorClassName?: string;
    hintClassName?: string;
    activeLabel?: boolean;
    colSpan?: number; // Add this
}

// ============================================
// Form Input Interfaces
// ============================================

// ============================================
// Base Configuration Interfaces
// ============================================

export interface PhoneData {
    fullNumber: string;
    phoneCode: string;
    phoneNumber: string;
}

export interface StyleConfig {
    variant?: "default" | "filled" | "outlined" | "underlined";
    size?: "sm" | "md" | "lg";
    radius?: "none" | "sm" | "md" | "lg" | "full";
}

export interface LabelConfig {
    text?: string;
    show?: boolean;
    required?: boolean;
    requiredText?: string;
    className?: string;
}

export interface ValidationConfig {
    error?: string;
    showError?: boolean;
    successMessage?: string;
}

export interface LayoutConfig {
    colSpan?: number;
    fullWidth?: boolean;
    className?: string;
    wrapperClassName?: string;
}

export interface BaseInputConfig {
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    autoFocus?: boolean;
    className?: string;
}

// ============================================
// Type-Specific Configurations
// ============================================

export interface TextInputConfig extends BaseInputConfig {
    type: "text";
}

export interface EmailInputConfig extends BaseInputConfig {
    type: "email";
}

export interface PasswordInputConfig extends BaseInputConfig {
    type: "password";
}

export interface NumberInputConfig extends BaseInputConfig {
    type: "number";
    min?: number;
    max?: number;
    step?: number;
}

export interface SearchInputConfig extends BaseInputConfig {
    type: "search";
}

export interface UrlInputConfig extends BaseInputConfig {
    type: "url";
}

export interface TelInputConfig extends BaseInputConfig {
    type: "tel";
}

export interface DropdownInputConfig extends BaseInputConfig {
    type: "dropdown";
    options: { key: string; value: string }[];
    width?: "full" | "fit";
    emptyText?: string;
    searchable?: boolean;
    searchPlaceholder?: string;
}

export interface TextareaInputConfig extends BaseInputConfig {
    type: "textarea";
    rows?: number;
    cols?: number;
    resize?: "none" | "both" | "horizontal" | "vertical";
    maxLength?: number;
}

export interface CheckboxInputConfig {
    type: "checkbox";
    label?: string;
    disabled?: boolean;
    className?: string;
    checkedIcon?: React.ReactNode;
    uncheckedIcon?: React.ReactNode;
}

export interface OTPInputConfig {
    type: "otp";
    length?: number;
    onComplete?: (code: string) => void;
    resendable?: boolean;
    resendInterval?: number;
    onResend?: () => Promise<void>;
    disabled?: boolean;
    autoFocus?: boolean;
    className?: string;
}

export interface PhoneInputConfig extends BaseInputConfig {
    type: "phone";
    onPhoneExtracted?: (data: PhoneData) => void;
    defaultCountry?: string;
    preferredCountries?: string[];
}

export interface DateInputConfig extends BaseInputConfig {
    type: "date";
    format?: "date" | "datetime" | "time";
    minDate?: Date;
    maxDate?: Date;
    highlightedDates?: Date[];
}

export interface FileInputConfig {
    type: "file";
    label?: string;
    icon?: React.ReactNode;
    accept?: string;
    maxSize?: number;
    disabled?: boolean;
    className?: string;
}

// ============================================
// Union Type for All Input Configurations
// ============================================

export type InputTypeConfig =
    | TextInputConfig
    | EmailInputConfig
    | PasswordInputConfig
    | NumberInputConfig
    | SearchInputConfig
    | UrlInputConfig
    | TelInputConfig
    | DropdownInputConfig
    | TextareaInputConfig
    | CheckboxInputConfig
    | OTPInputConfig
    | PhoneInputConfig
    | DateInputConfig
    | FileInputConfig;

// ============================================
// Main FormInput Props
// ============================================

export interface BaseFormInputProps<T extends FieldValues = FieldValues> {
    // React Hook Form integration
    name: Path<T>;
    control: Control<T>;

    // Type configuration (contains both type and its specific config)
    type: InputTypeConfig;

    // Common configurations
    style?: StyleConfig;
    label?: LabelConfig;
    validation?: ValidationConfig;
    layout?: LayoutConfig;

    // Callbacks
    onChange?: (value: any) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    format?: (value: string) => string;
}

export type FormInputProps<T extends FieldValues = FieldValues> = Omit<
    BaseFormInputProps<T>,
    "control"
> & {
    name: Path<T>;
    validation?: Omit<BaseFormInputProps<T>["validation"], "error">;
};

// ============================================
// Helper type to extract config from type
// ============================================

export type ExtractTypeConfig<T extends InputTypeConfig["type"]> = Extract<
    InputTypeConfig,
    { type: T }
>;
