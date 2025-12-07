export interface OTPProps {
    value?: string;
    onChange?: (value: string) => void;
    onComplete?: (code: string) => void;
    length?: number;
    disabled?: boolean;
    autoFocus?: boolean;
    className?: string;
    classNames?: {
        container?: string;
        inputsWrapper?: string;
        input?: string;
        inputFocused?: string;
        inputFilled?: string;
        resendContainer?: string;
        resendButton?: string;
        resendTimer?: string;
        completionMessage?: string;
        resendTimerContainer?: string;
    };
    resendable?: boolean;
    resendInterval?: number;
    onResend?: () => Promise<void>;
    resendText?: string;
    resendTimerText?: (time: string) => string;
    size?: "sm" | "md" | "lg";
}
