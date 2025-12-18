// src/components/Form/FormFieldWrapper.tsx
import { FormFieldWrapperProps } from "./types";
import { cn } from "../../utils/cn";
import { getFormConfig } from "../../config/formConfig";
import { helperTextVariants } from "../../styles/variants";

export const FormFieldWrapper = ({
    children,
    label,
    validation = {},
    layout = {},
    labelClassName,
    size = "md",
}: FormFieldWrapperProps) => {
    const globalConfig = getFormConfig();

    const status = validation.error
        ? "error"
        : validation.successMessage
        ? "success"
        : "default";

    const showError = validation.showError !== false && validation.error;
    const showSuccess = validation.showSuccess && validation.successMessage;

    return (
        <div className={cn("flex flex-col w-full", layout.className)}>
            {label?.show !== false && label?.text && (
                <label className={labelClassName}>{label.text}</label>
            )}
            {children}
            {showError && (
                <p
                    className={cn(
                        helperTextVariants({ status: "error" }),
                        globalConfig.classNames?.error
                    )}
                >
                    {validation.error}
                </p>
            )}
            {showSuccess && (
                <p
                    className={cn(
                        helperTextVariants({ status: "success" }),
                        globalConfig.classNames?.success
                    )}
                >
                    {validation.successMessage}
                </p>
            )}
            {label?.requiredText && (
                <p
                    className={cn(
                        helperTextVariants({ status: "default" }),
                        globalConfig.classNames?.helper
                    )}
                >
                    {label.requiredText}
                </p>
            )}
        </div>
    );
};
