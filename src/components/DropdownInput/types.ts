import { ControllerRenderProps } from "react-hook-form";
import { FormInputProps } from "../Form/types";

export interface DropdownInputProps {
    field: ControllerRenderProps<any, any>;
    config: Extract<FormInputProps["type"], { type: "dropdown" }>;
    variant?: "default" | "filled" | "outlined" | "underlined";
    size?: "sm" | "md" | "lg";
    radius?: "none" | "sm" | "md" | "lg" | "full";
    onKeyDown?: (e: React.KeyboardEvent) => void;
    format?: (value: string) => string;
}
