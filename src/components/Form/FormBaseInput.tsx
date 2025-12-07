import { useEffect, useState, type ComponentType } from "react";
import { Controller } from "react-hook-form";
import type { FieldValues, ControllerRenderProps } from "react-hook-form";
import { inputVariants } from "../../styles/variants";
import { cn } from "../../utils/cn";
import { FormFieldWrapper } from "./FormFieldWrapper";
import { EyeIcon, EyeOffIcon, Search, X } from "lucide-react";
import { DropdownInput } from "../DropdownInput";
import { DateInput } from "../DateInput";
import { FileInput } from "../FileInput";
import { CheckBox } from "../CheckBox";
import { OTP } from "../OTP";
import { BaseFormInputProps } from "./types";

export const FormBaseInput = <T extends FieldValues = FieldValues>({
    name,
    control,
    type: typeConfig,
    style = {},
    label = {},
    validation = {},
    layout = {},
    onChange,
    onBlur,
    onFocus,
    onKeyDown,
    format,
}: BaseFormInputProps<T>) => {
    const [showPassword, setShowPassword] = useState(false);
    const [PhoneInputComponent, setPhoneInputComponent] =
        useState<ComponentType<any> | null>(null);
    const [isPhoneInputLoading, setIsPhoneInputLoading] = useState(false);

    const status = validation.error
        ? "error"
        : validation.successMessage
        ? "success"
        : "default";

    const styleConfig = {
        variant: style.variant || "default",
        size: style.size || "md",
        radius: style.radius || "md",
    };

    const labelConfig = {
        text: label.text,
        show: label.show !== false,
        required: label.required || false,
        requiredText: label.requiredText,
        className: label.className,
    };

    const inputClassName = cn(
        inputVariants({
            variant: styleConfig.variant,
            size: styleConfig.size,
            radius: styleConfig.radius,
            status,
        }),
        typeConfig.type !== "checkbox" &&
            typeConfig.type !== "otp" &&
            "className" in typeConfig
            ? typeConfig.className
            : "",
        "dark:bg-black-500"
    );

    // Dynamically load PhoneInput only when needed
    useEffect(() => {
        if (
            typeConfig.type === "phone" &&
            !PhoneInputComponent &&
            !isPhoneInputLoading
        ) {
            setIsPhoneInputLoading(true);
            import("react-phone-input-2")
                .then((mod) => {
                    // Handle both CJS and ESM shapes
                    const Comp = (mod as any).default || mod;
                    setPhoneInputComponent(() => Comp as ComponentType<any>);
                    setIsPhoneInputLoading(false);
                })
                .catch((error) => {
                    console.error("Failed to load phone input:", error);
                    setIsPhoneInputLoading(false);
                });
        }
    }, [typeConfig.type, PhoneInputComponent, isPhoneInputLoading]);

    const renderInput = (field: ControllerRenderProps<T, any>) => {
        // Get the actual input type
        const inputType =
            typeConfig.type === "password"
                ? showPassword
                    ? "text"
                    : "password"
                : typeConfig.type;

        switch (typeConfig.type) {
            case "textarea":
                return (
                    <textarea
                        {...field}
                        placeholder={typeConfig.placeholder}
                        disabled={typeConfig.disabled}
                        readOnly={typeConfig.readOnly}
                        rows={typeConfig.rows || 3}
                        cols={typeConfig.cols}
                        maxLength={typeConfig.maxLength}
                        className={cn(
                            inputClassName,
                            typeConfig.resize && `resize-${typeConfig.resize}`
                        )}
                        onChange={(e) => {
                            const value = format
                                ? format(e.target.value)
                                : e.target.value;
                            field.onChange(value);
                            onChange?.(value);
                        }}
                        onBlur={() => {
                            field.onBlur();
                            onBlur?.();
                        }}
                        onFocus={onFocus}
                        onKeyDown={onKeyDown}
                    />
                );

            case "dropdown":
                return (
                    <DropdownInput
                        field={field}
                        config={typeConfig}
                        variant={styleConfig.variant}
                        size={styleConfig.size}
                        radius={styleConfig.radius}
                        onKeyDown={onKeyDown}
                        format={format}
                    />
                );

            case "checkbox":
                return (
                    <CheckBox
                        checked={!!field.value}
                        onChange={() => field.onChange(!field.value)}
                        label={typeConfig.label}
                        disabled={typeConfig.disabled}
                        className={typeConfig.className}
                        checkedIcon={typeConfig.checkedIcon}
                        uncheckedIcon={typeConfig.uncheckedIcon}
                        size={styleConfig.size}
                    />
                );

            case "otp":
                return (
                    <OTP
                        value={field.value || ""}
                        onChange={(value) => field.onChange(value)}
                        onComplete={typeConfig.onComplete}
                        length={typeConfig.length}
                        resendable={typeConfig.resendable}
                        resendInterval={typeConfig.resendInterval}
                        onResend={typeConfig.onResend}
                        disabled={typeConfig.disabled}
                        autoFocus={typeConfig.autoFocus}
                        size={styleConfig.size}
                    />
                );

            case "phone":
                // Show loading state or placeholder while phone input loads
                if (!PhoneInputComponent) {
                    return (
                        <div
                            className={cn(
                                inputClassName,
                                "flex items-center justify-center"
                            )}
                        >
                            <span className="text-gray-400 text-sm">
                                {isPhoneInputLoading
                                    ? "Loading phone input..."
                                    : "Loading..."}
                            </span>
                        </div>
                    );
                }

                return (
                    <PhoneInputComponent
                        country={typeConfig.defaultCountry || "us"}
                        value={field.value || ""}
                        onChange={(phoneValue: string, country: any) => {
                            const phoneCode = country.dialCode;
                            const phoneNumberOnly = phoneValue.substring(
                                country.dialCode.length
                            );

                            field.onChange(phoneValue);

                            if (typeConfig.onPhoneExtracted) {
                                typeConfig.onPhoneExtracted({
                                    fullNumber: phoneValue,
                                    phoneCode,
                                    phoneNumber: phoneNumberOnly,
                                });
                            }
                        }}
                        inputClass="w-full! rounded-lg! h-11! focus:ring-primary-500! focus:border-2! focus:border-primary-500! shadow-none!"
                        buttonClass="focus:ring-primary-500! focus:border-2! focus:border-primary-500! shadow-none!"
                        dropdownClass="border border-primary-500!"
                        disabled={typeConfig.disabled}
                        placeholder={typeConfig.placeholder}
                        preferredCountries={typeConfig.preferredCountries}
                        enableSearch
                        disableSearchIcon
                    />
                );

            case "date":
                return (
                    <DateInput
                        field={field}
                        format={typeConfig.format}
                        minDate={typeConfig.minDate}
                        maxDate={typeConfig.maxDate}
                        highlightedDates={typeConfig.highlightedDates}
                        disabled={typeConfig.disabled}
                        placeholder={typeConfig.placeholder}
                        className={typeConfig.className}
                        variant={styleConfig.variant}
                        size={styleConfig.size}
                        radius={styleConfig.radius}
                    />
                );

            case "file":
                return (
                    <FileInput
                        field={field}
                        label={
                            "label" in typeConfig ? typeConfig.label : undefined
                        }
                        icon={
                            "icon" in typeConfig ? typeConfig.icon : undefined
                        }
                        accept={
                            "accept" in typeConfig
                                ? typeConfig.accept
                                : undefined
                        }
                        maxSize={
                            "maxSize" in typeConfig
                                ? typeConfig.maxSize
                                : undefined
                        }
                        disabled={
                            "disabled" in typeConfig
                                ? typeConfig.disabled
                                : undefined
                        }
                        className={
                            "className" in typeConfig
                                ? typeConfig.className
                                : undefined
                        }
                        variant={styleConfig.variant}
                        size={styleConfig.size}
                        radius={styleConfig.radius}
                        onKeyDown={onKeyDown}
                    />
                );

            case "search":
                return (
                    <div className="relative">
                        <input
                            {...field}
                            type="text"
                            placeholder={typeConfig.placeholder}
                            disabled={typeConfig.disabled}
                            readOnly={typeConfig.readOnly}
                            autoFocus={typeConfig.autoFocus}
                            className={cn(inputClassName, "pr-10")}
                            onChange={(e) => {
                                const value = format
                                    ? format(e.target.value)
                                    : e.target.value;
                                field.onChange(value);
                                onChange?.(value);
                            }}
                            onBlur={() => {
                                field.onBlur();
                                onBlur?.();
                            }}
                            onFocus={onFocus}
                            onKeyDown={onKeyDown}
                        />
                        <Search
                            size={20}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        {field.value && (
                            <button
                                type="button"
                                onClick={() => field.onChange("")}
                                className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                );

            default:
                // Handle standard HTML input types
                return (
                    <div className="relative">
                        <input
                            {...field}
                            type={inputType}
                            placeholder={
                                "placeholder" in typeConfig
                                    ? typeConfig.placeholder
                                    : ""
                            }
                            disabled={
                                "disabled" in typeConfig
                                    ? typeConfig.disabled
                                    : false
                            }
                            readOnly={
                                "readOnly" in typeConfig
                                    ? typeConfig.readOnly
                                    : false
                            }
                            autoFocus={
                                "autoFocus" in typeConfig
                                    ? typeConfig.autoFocus
                                    : false
                            }
                            min={
                                typeConfig.type === "number"
                                    ? typeConfig.min
                                    : undefined
                            }
                            max={
                                typeConfig.type === "number"
                                    ? typeConfig.max
                                    : undefined
                            }
                            step={
                                typeConfig.type === "number"
                                    ? typeConfig.step
                                    : undefined
                            }
                            className={cn(
                                inputClassName,
                                typeConfig.type === "password" && "pr-10"
                            )}
                            onChange={(e) => {
                                const value = format
                                    ? format(e.target.value)
                                    : e.target.value;
                                field.onChange(value);
                                onChange?.(value);
                            }}
                            onBlur={() => {
                                field.onBlur();
                                onBlur?.();
                            }}
                            onFocus={onFocus}
                            onKeyDown={onKeyDown}
                        />

                        {typeConfig.type === "password" && (
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? (
                                    <EyeOffIcon size={20} />
                                ) : (
                                    <EyeIcon size={20} />
                                )}
                            </button>
                        )}
                    </div>
                );
        }
    };

    if (typeConfig.type === "checkbox") {
        return (
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <div
                        className={cn("flex flex-col", layout.wrapperClassName)}
                        style={{
                            gridColumn: layout.colSpan
                                ? `span ${layout.colSpan}`
                                : undefined,
                        }}
                    >
                        {renderInput(field)}
                        {validation.showError !== false && validation.error && (
                            <p className="text-xs text-red-500 mt-1">
                                *{validation.error}
                            </p>
                        )}
                        {label.requiredText && (
                            <p className="text-xs text-gray-500 mt-1">
                                *{label.requiredText}
                            </p>
                        )}
                    </div>
                )}
            />
        );
    }

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <FormFieldWrapper
                    label={labelConfig.show ? labelConfig.text : undefined}
                    required={labelConfig.required}
                    error={
                        validation.showError !== false
                            ? validation.error
                            : undefined
                    }
                    successMessage={validation.successMessage}
                    className={layout.className}
                    parentClassName={layout.wrapperClassName}
                    colSpan={layout.colSpan}
                    disabled={
                        typeConfig.type !== "otp" && "disabled" in typeConfig
                            ? typeConfig.disabled
                            : false
                    }
                >
                    {renderInput(field)}
                </FormFieldWrapper>
            )}
        />
    );
};
