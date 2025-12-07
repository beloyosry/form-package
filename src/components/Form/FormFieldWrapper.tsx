import { FC } from "react";
import { cn } from "../../utils/cn";
import { FormFieldWrapperProps } from "./types";

export const FormFieldWrapper: FC<FormFieldWrapperProps> = ({
    children,
    label,
    required = false,
    disabled = false,
    error,
    successMessage,
    hint,
    className = "",
    parentClassName = "",
    labelClassName = "",
    errorClassName = "",
    hintClassName = "",
    activeLabel = true,
    colSpan, // Add this
}) => {
    return (
        <div
            className={cn("w-full", parentClassName)}
            style={{
                gridColumn: colSpan ? `span ${colSpan}` : undefined,
            }}
        >
            {label && activeLabel && (
                <label
                    className={cn(
                        "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
                        disabled && "opacity-50 cursor-not-allowed",
                        labelClassName
                    )}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className={cn("relative", className)}>{children}</div>

            {hint && !error && !successMessage && (
                <p
                    className={cn(
                        "mt-1 text-sm text-gray-500 dark:text-gray-400",
                        hintClassName
                    )}
                >
                    {hint}
                </p>
            )}

            {error && (
                <p
                    className={cn(
                        "mt-1 text-sm text-red-600 dark:text-red-400",
                        errorClassName
                    )}
                >
                    {error}
                </p>
            )}

            {successMessage && !error && (
                <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                    {successMessage}
                </p>
            )}
        </div>
    );
};
