// src/styles/variants.ts
import { cva, type VariantProps } from "class-variance-authority";

/**
 * Input variants with responsive support
 * Supports Tailwind's responsive prefixes (sm:, md:, lg:, xl:, 2xl:)
 */
export const inputVariants = cva(
    // Base classes
    "w-full transition-all duration-200 outline-none disabled:cursor-not-allowed disabled:opacity-50 font-sans",
    {
        variants: {
            variant: {
                default:
                    "border bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500",
                filled: "border-0 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700",
                outlined:
                    "border-2 bg-transparent text-gray-900 dark:text-gray-100",
                ghost: "border-0 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-900 dark:text-gray-100",
                soft: "border-0 bg-primary-50 dark:bg-primary-900/20 text-primary-900 dark:text-primary-100",
            },
            size: {
                xs: "text-xs px-2 py-1 h-7",
                sm: "text-sm px-3 py-1.5 h-9",
                md: "text-base px-4 py-2 h-11",
                lg: "text-lg px-5 py-3 h-13",
                xl: "text-xl px-6 py-4 h-16",
            },
            radius: {
                none: "rounded-none",
                sm: "rounded-sm",
                md: "rounded-md",
                lg: "rounded-lg",
                xl: "rounded-xl",
                "2xl": "rounded-2xl",
                full: "rounded-full",
            },
            status: {
                default:
                    "border-gray-300 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
                error: "border-red-500 dark:border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 text-red-900 dark:text-red-100",
                success:
                    "border-green-500 dark:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 text-green-900 dark:text-green-100",
                warning:
                    "border-yellow-500 dark:border-yellow-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 text-yellow-900 dark:text-yellow-100",
            },
            fullWidth: {
                true: "w-full",
                false: "w-auto",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
            radius: "md",
            status: "default",
            fullWidth: true,
        },
    }
);

export const labelVariants = cva("font-medium transition-colors duration-200", {
    variants: {
        size: {
            xs: "text-xs mb-1",
            sm: "text-sm mb-1.5",
            md: "text-sm mb-2",
            lg: "text-base mb-2",
            xl: "text-lg mb-2.5",
        },
        status: {
            default: "text-gray-700 dark:text-gray-300",
            error: "text-red-600 dark:text-red-400",
            success: "text-green-600 dark:text-green-400",
            warning: "text-yellow-600 dark:text-yellow-400",
        },
        required: {
            true: "after:content-['*'] after:ml-0.5 after:text-red-500",
            false: "",
        },
    },
    defaultVariants: {
        size: "md",
        status: "default",
        required: false,
    },
});

export const helperTextVariants = cva(
    "text-sm mt-1.5 transition-colors duration-200",
    {
        variants: {
            status: {
                default: "text-gray-500 dark:text-gray-400",
                error: "text-red-600 dark:text-red-400",
                success: "text-green-600 dark:text-green-400",
                warning: "text-yellow-600 dark:text-yellow-400",
            },
        },
        defaultVariants: {
            status: "default",
        },
    }
);

export const buttonVariants = cva(
    "inline-flex items-center justify-center font-medium transition-all duration-200 outline-none disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                primary:
                    "bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600",
                secondary:
                    "bg-gray-600 text-white hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600",
                outline:
                    "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20",
                ghost: "text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-900/20",
                danger: "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600",
            },
            size: {
                xs: "text-xs px-2.5 py-1.5 h-7",
                sm: "text-sm px-3 py-2 h-9",
                md: "text-base px-4 py-2.5 h-11",
                lg: "text-lg px-6 py-3 h-13",
                xl: "text-xl px-8 py-4 h-16",
            },
            radius: {
                none: "rounded-none",
                sm: "rounded-sm",
                md: "rounded-md",
                lg: "rounded-lg",
                xl: "rounded-xl",
                full: "rounded-full",
            },
            fullWidth: {
                true: "w-full",
                false: "w-auto",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
            radius: "md",
            fullWidth: false,
        },
    }
);

// Export types
export type InputVariants = VariantProps<typeof inputVariants>;
export type LabelVariants = VariantProps<typeof labelVariants>;
export type HelperTextVariants = VariantProps<typeof helperTextVariants>;
export type ButtonVariants = VariantProps<typeof buttonVariants>;

// Preset combinations for quick styling
export const inputPresets = {
    modern: {
        variant: "filled" as const,
        radius: "lg" as const,
        size: "lg" as const,
    },
    minimal: {
        variant: "ghost" as const,
        radius: "none" as const,
        size: "md" as const,
    },
    classic: {
        variant: "outlined" as const,
        radius: "sm" as const,
        size: "md" as const,
    },
    rounded: {
        variant: "default" as const,
        radius: "full" as const,
        size: "md" as const,
    },
    soft: {
        variant: "soft" as const,
        radius: "xl" as const,
        size: "md" as const,
    },
} as const;

export type InputPreset = keyof typeof inputPresets;
