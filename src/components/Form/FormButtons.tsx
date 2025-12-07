import { FC } from "react";
import { FormButtonsProps } from "./types";
import { cn } from "../../utils/cn";

export const FormButtons: FC<FormButtonsProps> = ({
    actions = {},
    style = {},
}) => {
    const {
        submitText = "Submit",
        cancelText = "Cancel",
        isLoading = false,
        disabled = false,
        removeCancel = false,
        onConfirm,
        onCancel,
    } = actions;

    const { className, childClassName } = style;

    const submitButtonText =
        submitText.charAt(0).toUpperCase() + submitText.slice(1);

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            // Default behavior: go back in browser history
            window.history.back();
        }
    };

    return (
        <div className={cn("flex gap-4 pt-4", className)}>
            <button
                type="submit"
                disabled={disabled || isLoading}
                onClick={onConfirm}
                className={cn("form-button-submit flex-1", childClassName)}
            >
                {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg
                            className="animate-spin h-5 w-5"
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
                        Loading...
                    </span>
                ) : (
                    submitButtonText
                )}
            </button>

            {!removeCancel && (
                <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isLoading}
                    className={cn("form-button-cancel", childClassName)}
                >
                    {cancelText}
                </button>
            )}
        </div>
    );
};
