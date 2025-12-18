// src/components/Form/FormButtons.tsx
import { FormButtonsProps } from "./types";
import { cn } from "../../utils/cn";
import { getFormConfig } from "../../config/formConfig";
import { buttonVariants } from "../../styles/variants";
import {
    resolveResponsiveValue,
    getResponsiveClasses,
} from "../../utils/responsive";

export const FormButtons = ({
    submitText = "Submit",
    cancelText = "Cancel",
    onCancel,
    submitDisabled = false,
    cancelDisabled = false,
    loading = false,
    submitStyle = {},
    cancelStyle = {},
    layout = "horizontal",
    className,
}: FormButtonsProps) => {
    const globalConfig = getFormConfig();

    const submitConfig = {
        variant:
            submitStyle.variant || globalConfig.button?.variant || "primary",
        size: submitStyle.size || globalConfig.button?.size || "md",
        radius: submitStyle.radius || globalConfig.button?.radius || "md",
        fullWidth:
            submitStyle.fullWidth !== undefined ? submitStyle.fullWidth : false,
    };

    const cancelConfig = {
        variant: cancelStyle.variant || "outline",
        size: cancelStyle.size || globalConfig.button?.size || "md",
        radius: cancelStyle.radius || globalConfig.button?.radius || "md",
        fullWidth:
            cancelStyle.fullWidth !== undefined ? cancelStyle.fullWidth : false,
    };

    const containerClass = cn(
        "flex gap-3 mt-6",
        layout === "vertical" && "flex-col",
        layout === "space-between" && "justify-between",
        layout === "horizontal" && "justify-end",
        className
    );

    return (
        <div className={containerClass}>
            {onCancel && (
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={cancelDisabled || loading}
                    className={cn(
                        buttonVariants({
                            variant: cancelConfig.variant,
                            size: resolveResponsiveValue(
                                cancelConfig.size,
                                "md"
                            ),
                            radius: cancelConfig.radius,
                            fullWidth: cancelConfig.fullWidth,
                        }),
                        getResponsiveClasses(cancelConfig.size, ""),
                        cancelStyle.className,
                        globalConfig.classNames?.button
                    )}
                >
                    {cancelText}
                </button>
            )}
            <button
                type="submit"
                disabled={submitDisabled || loading}
                className={cn(
                    buttonVariants({
                        variant: submitConfig.variant,
                        size: resolveResponsiveValue(submitConfig.size, "md"),
                        radius: submitConfig.radius,
                        fullWidth: submitConfig.fullWidth,
                    }),
                    getResponsiveClasses(submitConfig.size, ""),
                    submitStyle.className,
                    globalConfig.classNames?.button
                )}
            >
                {loading ? (
                    <div className="flex items-center gap-2">
                        <svg
                            className="animate-spin h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        <span>Loading...</span>
                    </div>
                ) : (
                    submitText
                )}
            </button>
        </div>
    );
};
