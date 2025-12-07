import { ControllerRenderProps } from "react-hook-form";

export interface DateInputProps {
    field: ControllerRenderProps<any, any>;
    format?: "date" | "datetime" | "time";
    minDate?: Date;
    maxDate?: Date;
    highlightedDates?: Date[];
    disabled?: boolean;
    placeholder?: string;
    className?: string;
    variant?: "default" | "filled" | "outlined" | "underlined";
    size?: "sm" | "md" | "lg";
    radius?: "none" | "sm" | "md" | "lg" | "full";
}
