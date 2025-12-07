import { FC, useState } from "react";
import { CheckBoxProps } from "./types";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";

const checkboxVariants = cva(
    [
        "relative",
        "inline-flex",
        "items-center",
        "justify-center",
        "cursor-pointer",
        "transition-all",
        "duration-300",
        "ease-out",
        "border-2",
        "group/checkbox",
        "overflow-hidden",
        "backdrop-blur-sm",
    ],
    {
        variants: {
            variant: {
                default:
                    "border-gray-300 hover:border-primary-400 dark:border-gray-600 dark:hover:border-primary-500 hover:shadow-lg hover:shadow-primary-500/20 hover:scale-110",
                outlined:
                    "border-primary-500 hover:border-primary-600 hover:shadow-xl hover:shadow-primary-500/30 hover:scale-110 ring-2 ring-primary-100 dark:ring-primary-900/30",
                filled: "bg-linear-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 border-transparent hover:from-gray-200 hover:to-gray-100 dark:hover:from-gray-600 dark:hover:to-gray-700 hover:scale-110 shadow-inner",
            },
            size: {
                sm: "w-4 h-4 rounded",
                md: "w-5 h-5 rounded-md",
                lg: "w-6 h-6 rounded-lg",
            },
            checked: {
                true: "bg-linear-to-br from-primary-500 via-primary-600 to-primary-700 border-primary-500 shadow-xl shadow-primary-500/40 scale-110 ring-4 ring-primary-100 dark:ring-primary-900/30",
                false: "bg-white dark:bg-gray-800",
            },
            disabled: {
                true: "opacity-40 cursor-not-allowed hover:scale-100 hover:shadow-none grayscale",
                false: "",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
            checked: false,
            disabled: false,
        },
    }
);

const labelVariants = cva(
    "ml-3 cursor-pointer select-none transition-all duration-300 font-medium tracking-tight",
    {
        variants: {
            size: {
                sm: "text-sm",
                md: "text-base",
                lg: "text-lg",
            },
            disabled: {
                true: "opacity-40 cursor-not-allowed",
                false: "group-hover:text-primary-600 dark:group-hover:text-primary-400 group-hover:translate-x-0.5",
            },
            checked: {
                true: "text-gray-900 dark:text-white font-semibold",
                false: "text-gray-700 dark:text-gray-300",
            },
        },
        defaultVariants: {
            size: "md",
            disabled: false,
            checked: false,
        },
    }
);

export const CheckBox: FC<CheckBoxProps> = ({
    checked,
    onChange,
    label,
    disabled = false,
    className = "",
    classNames = {},
    checkedIcon,
    uncheckedIcon,
    size = "md",
    variant = "default",
}) => {
    const [isPressed, setIsPressed] = useState(false);

    const defaultCheckedIcon = (
        <svg
            className={cn(
                "w-full h-full p-0.5 text-white drop-shadow-sm",
                "animate-in zoom-in-75 duration-300 ease-out"
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path strokeWidth={3.5} d="M5 13l4 4L19 7" />
        </svg>
    );

    const defaultUncheckedIcon = (
        <div className="absolute inset-0 rounded overflow-hidden">
            {/* linear overlay on hover */}
            <div
                className={cn(
                    "absolute inset-0",
                    "opacity-0 group-hover/checkbox:opacity-100",
                    "bg-linear-to-br from-primary-50 via-blue-50 to-purple-50",
                    "dark:from-primary-900/30 dark:via-blue-900/20 dark:to-purple-900/20",
                    "transition-opacity duration-300"
                )}
            />

            {/* Animated border shine */}
            <div
                className={cn(
                    "absolute inset-0 opacity-0 group-hover/checkbox:opacity-100",
                    "bg-linear-to-r from-transparent via-white/40 to-transparent dark:via-white/10",
                    "animate-[shimmer_2s_ease-in-out_infinite]",
                    "-translate-x-full"
                )}
            />
        </div>
    );

    return (
        <label
            className={cn(
                "inline-flex items-center group cursor-pointer",
                "py-2.5 px-2 -mx-2 rounded-xl",
                "transition-all duration-300 ease-out",
                !disabled &&
                    "hover:bg-linear-to-r hover:from-gray-50 hover:via-primary-50/30 hover:to-blue-50/30 dark:hover:from-gray-800/50 dark:hover:via-primary-900/20 dark:hover:to-blue-900/20",
                !disabled && "active:scale-[0.98]",
                disabled && "cursor-not-allowed",
                classNames.container,
                className
            )}
            onMouseDown={() => !disabled && setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
        >
            <div className="relative flex items-center justify-center">
                {/* Outer glow ring when checked */}
                {checked && !disabled && (
                    <>
                        <div
                            className={cn(
                                "absolute inset-0 rounded-lg",
                                "bg-linear-to-br from-primary-400 to-primary-600",
                                "blur-lg opacity-50",
                                "animate-pulse",
                                "scale-150"
                            )}
                        />

                        {/* Rotating linear ring */}
                        <div
                            className={cn(
                                "absolute inset-0 rounded-lg",
                                "bg-linear-to-r from-primary-400 via-blue-400 to-purple-400",
                                "opacity-30 blur-md",
                                "animate-spin-slow",
                                "scale-125"
                            )}
                        />
                    </>
                )}

                {/* Checkbox container */}
                <div
                    onClick={!disabled ? onChange : undefined}
                    className={cn(
                        "relative z-10",
                        checkboxVariants({
                            variant,
                            size,
                            checked,
                            disabled,
                        }),
                        isPressed && !disabled && "scale-95",
                        classNames.checkbox,
                        checked ? classNames.active : classNames.inactive
                    )}
                >
                    {/* Ripple effect on check */}
                    {checked && (
                        <div
                            className={cn(
                                "absolute inset-0 rounded-md",
                                "bg-white/30",
                                "animate-[ping_0.6s_cubic-bezier(0,0,0.2,1)]"
                            )}
                        />
                    )}

                    {/* Inner shine effect */}
                    {checked && (
                        <div
                            className={cn(
                                "absolute inset-0 rounded-md",
                                "bg-linear-to-br from-white/40 via-transparent to-transparent",
                                "opacity-60"
                            )}
                        />
                    )}

                    {/* Checked state icon */}
                    {checked && (
                        <span
                            className={cn(
                                "flex items-center justify-center relative z-20",
                                classNames.checkedIcon
                            )}
                        >
                            {checkedIcon || defaultCheckedIcon}
                        </span>
                    )}

                    {/* Unchecked state */}
                    {!checked && (uncheckedIcon || defaultUncheckedIcon)}
                </div>
            </div>

            {/* Label with enhanced styling */}
            {label && (
                <span
                    className={cn(
                        labelVariants({ size, disabled, checked }),
                        "relative",
                        classNames.label
                    )}
                >
                    {/* Text linear on checked */}
                    {checked && !disabled && (
                        <span className="absolute inset-0 bg-linear-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent dark:from-primary-400 dark:to-blue-400">
                            {label}
                        </span>
                    )}
                    <span className={checked && !disabled ? "opacity-0" : ""}>
                        {label}
                    </span>
                </span>
            )}
        </label>
    );
};
