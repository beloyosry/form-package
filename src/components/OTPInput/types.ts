import { ControllerRenderProps } from "react-hook-form";

export interface OTPInputProps {
    field: ControllerRenderProps<any, any>;
    length?: number;
    onComplete?: (code: string) => void;
    resendable?: boolean;
    resendInterval?: number;
    onResend?: () => Promise<void>;
    disabled?: boolean;
    size?: "sm" | "md" | "lg";
}