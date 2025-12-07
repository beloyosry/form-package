import { ControllerRenderProps } from "react-hook-form";

export interface FileInputProps {
    field: ControllerRenderProps<any, any>;
    label?: string;
    icon?: React.ReactNode;
    accept?: string;
    maxSize?: number;
    disabled?: boolean;
    className?: string;
    variant?: "default" | "filled" | "outlined" | "underlined";
    size?: "sm" | "md" | "lg";
    radius?: "none" | "sm" | "md" | "lg" | "full";
    onKeyDown?: (e: React.KeyboardEvent) => void;
}
