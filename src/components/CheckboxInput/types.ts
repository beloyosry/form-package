import { ControllerRenderProps } from "react-hook-form";

export interface CheckboxInputProps {
    field: ControllerRenderProps<any, any>;
    label?: string;
    disabled?: boolean;
    className?: string;
    checkedIcon?: React.ReactNode;
    uncheckedIcon?: React.ReactNode;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "outlined" | "filled";
}
