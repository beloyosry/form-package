export const theme = {
    colors: {
        primary: "primary-500",
        secondary: "secondary-500",
        error: "red-500",
        success: "green-500",
        border: "gray-300",
        text: "gray-900",
        background: "white",
    },
    spacing: {
        input: "px-4 py-2",
        label: "mb-2",
        error: "mt-1",
    },
    radius: {
        sm: "rounded-md",
        md: "rounded-lg",
        lg: "rounded-3xl",
        full: "rounded-full",
    },
    transitions: {
        default: "transition-colors duration-200",
    },
} as const;
