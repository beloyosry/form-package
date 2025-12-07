import { cva } from "class-variance-authority";
import { theme } from "./theme";

export const inputVariants = cva(
    [
        "w-full",
        "border",
        "outline-none",
        "transition-all",
        "duration-200",
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",
    ],
    {
        variants: {
            variant: {
                default: [
                    "bg-white",
                    "border-gray-300",
                    "focus:border-primary-500",
                    "focus:ring-2",
                    "focus:ring-primary-500/20",
                ],
                filled: [
                    "bg-gray-100",
                    "border-transparent",
                    "focus:bg-white",
                    "focus:border-primary-500",
                ],
                outlined: [
                    "bg-transparent",
                    "border-gray-400",
                    "focus:border-primary-500",
                ],
                underlined: [
                    "border-0",
                    "border-b-2",
                    "border-gray-300",
                    "rounded-none",
                    "focus:border-primary-500",
                ],
            },
            size: {
                sm: "h-9 px-3 py-1 text-sm",
                md: "h-11 px-4 py-2 text-base",
                lg: "h-13 px-5 py-3 text-lg",
            },
            radius: {
                none: "rounded-none",
                sm: "rounded-md",
                md: "rounded-lg",
                lg: "rounded-xl",
                full: "rounded-full",
            },
            status: {
                default: "",
                error: "border-red-500 focus:border-red-500 focus:ring-red-500/20",
                success:
                    "border-green-500 focus:border-green-500 focus:ring-green-500/20",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
            radius: "md",
            status: "default",
        },
    }
);

export const labelVariants = cva(
    ["block", "font-medium", "transition-colors"],
    {
        variants: {
            size: {
                sm: "text-xs mb-1",
                md: "text-sm mb-2",
                lg: "text-base mb-2",
            },
            status: {
                default: "text-gray-700",
                error: "text-red-500",
                success: "text-green-500",
            },
            required: {
                true: "after:content-['*'] after:ml-1 after:text-red-500",
                false: "",
            },
        },
        defaultVariants: {
            size: "md",
            status: "default",
            required: false,
        },
    }
);

export const errorVariants = cva(["text-xs", "mt-1"], {
    variants: {
        visible: {
            true: "block",
            false: "hidden",
        },
    },
    defaultVariants: {
        visible: true,
    },
});
