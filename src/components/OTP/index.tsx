import React, {
    useState,
    useEffect,
    useRef,
    ChangeEvent,
    KeyboardEvent,
    ClipboardEvent,
} from "react";
import { OTPProps } from "./types";
import { cn } from "../../utils/cn";

export const OTP: React.FC<OTPProps> = ({
    value: externalValue,
    onChange: externalOnChange,
    onComplete,
    length = 6,
    disabled = false,
    autoFocus = true,
    className = "",
    classNames = {},
    resendable = false,
    resendInterval = 60,
    onResend,
    resendText = "Resend",
    resendTimerText = (time) => `Resend in ${time}`,
}) => {
    const [internalOtp, setInternalOtp] = useState("");
    const [timer, setTimer] = useState(resendInterval);
    const [canResend, setCanResend] = useState(false);

    const otp = externalValue !== undefined ? externalValue : internalOtp;

    const updateOtp = React.useCallback(
        (newOtp: string) => {
            if (newOtp !== otp) {
                setInternalOtp(newOtp);
                if (externalOnChange) {
                    externalOnChange(newOtp);
                }
            }
        },
        [externalOnChange, otp]
    );

    const inputRefs = useRef<(HTMLInputElement | null)[]>(
        Array.from({ length }, () => null)
    );

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    useEffect(() => {
        if (!resendable || timer <= 0) return;

        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                const newTimer = prevTimer - 1;
                if (newTimer <= 0) {
                    setCanResend(true);
                    clearInterval(interval);
                }
                return newTimer;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timer, resendable]);

    const prevOtpRef = useRef(otp);
    useEffect(() => {
        const isComplete =
            otp.length === length && ![...otp].some((digit) => !digit);

        if (isComplete && onComplete && otp !== prevOtpRef.current) {
            onComplete(otp);
        }

        prevOtpRef.current = otp;
    }, [otp, length, onComplete]);

    useEffect(() => {
        if (autoFocus && inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, [autoFocus]);

    const handleResend = async () => {
        if (!canResend || !onResend) return;

        try {
            await onResend();
            setTimer(resendInterval);
            setCanResend(false);
            updateOtp("");
            inputRefs.current[0]?.focus();
        } catch (error) {
            console.error("Failed to resend OTP:", error);
        }
    };

    const handlePaste = (
        e: ClipboardEvent<HTMLInputElement>,
        index: number
    ) => {
        e.preventDefault();
        const pasteData = e.clipboardData?.getData("text/plain") || "";
        const pastedDigits = pasteData
            .replace(/\D/g, "")
            .slice(0, length - index);

        if (pastedDigits) {
            const newOtp = otp.split("");
            for (let i = 0; i < pastedDigits.length; i++) {
                if (index + i < length) {
                    newOtp[index + i] = pastedDigits[i];
                }
            }
            const updatedOtp = newOtp.join("");
            updateOtp(updatedOtp);

            const nextEmptyIndex = newOtp.findIndex(
                (digit, idx) => idx >= index && !digit
            );
            const nextIndex =
                nextEmptyIndex !== -1 ? nextEmptyIndex : length - 1;
            inputRefs.current[nextIndex]?.focus();
        }
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const value = e.target.value;

        if (value && !/^[0-9]$/.test(value)) {
            return;
        }

        const newOtp = otp.split("");
        newOtp[index] = value;
        const otpString = newOtp.join("");
        updateOtp(otpString);

        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        e: KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowLeft" && index > 0) {
            e.preventDefault();
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < length - 1) {
            e.preventDefault();
            inputRefs.current[index + 1]?.focus();
        }
    };

    return (
        <div className={cn("flex flex-col items-center w-full", className)}>
            <div className={cn("mb-6 text-center", classNames.container)}>
                <div
                    className={cn(
                        "flex justify-center gap-2 mb-6",
                        classNames.inputsWrapper
                    )}
                >
                    {Array.from({ length }, (_, index) => index).map(
                        (index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    inputRefs.current[index] = el;
                                }}
                                type="text"
                                maxLength={1}
                                className={cn(
                                    "otp-input",
                                    disabled && "form-input-disabled",
                                    classNames.input
                                )}
                                value={otp[index] || ""}
                                disabled={disabled}
                                onChange={(e) => handleInputChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={(e) => handlePaste(e, index)}
                                onFocus={(e) => e.target.select()}
                                onClick={(e) => {
                                    const target = e.target as HTMLInputElement;
                                    target.setSelectionRange(1, 1);
                                }}
                            />
                        )
                    )}
                </div>
            </div>

            {resendable && (
                <div
                    className={cn(
                        "flex items-center justify-center gap-2 mt-2",
                        classNames.resendContainer
                    )}
                >
                    <span className="text-sm text-gray-500">
                        Didn't receive code?
                    </span>
                    {canResend ? (
                        <button
                            type="button"
                            className={cn(
                                "text-sm text-primary-500 hover:text-primary-600 font-medium",
                                classNames.resendButton
                            )}
                            onClick={handleResend}
                        >
                            {resendText}
                        </button>
                    ) : (
                        <span
                            className={cn(
                                "text-sm text-gray-500",
                                classNames.resendTimer
                            )}
                        >
                            {resendTimerText(formatTime(timer))}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};
