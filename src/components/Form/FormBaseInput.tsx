// src/components/Form/FormBaseInput.tsx
import { useState, useMemo } from "react";
import * as RHF from "react-hook-form";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";
import {
    inputVariants,
    labelVariants,
    inputPresets,
} from "../../styles/variants";
import { cn } from "../../utils/cn";
import { getFormConfig } from "../../config/formConfig";
import {
    resolveResponsiveValue,
    getResponsiveClasses,
} from "../../utils/responsive";
import { FormFieldWrapper } from "./FormFieldWrapper";
import { EyeIcon, EyeOffIcon, Search, X } from "lucide-react";
import { DropdownInput } from "../DropdownInput";
import { DateInput } from "../DateInput";
import { FileInput } from "../FileInput";
import { CheckBox } from "../CheckBox";
import { OTP } from "../OTP";
import PhoneInput from "react-phone-input-2";
import { BaseFormInputProps } from "./types";

const Controller = RHF.Controller;

export const FormBaseInput = <TFieldValues extends FieldValues = FieldValues>({
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
}: BaseFormInputProps<TFieldValues>) => {
    const [showPassword, setShowPassword] = useState(false);
    const globalConfig = getFormConfig();

    // Determine status
    const status = validation.error
        ? "error"
        : validation.successMessage
        ? "success"
        : "default";

    // Merge global config with component props
    const styleConfig = useMemo(() => {
        const preset = style.preset ? inputPresets[style.preset] : null;

        return {
            variant:
                style.variant ||
                preset?.variant ||
                globalConfig.defaults?.variant ||
                "default",
            size:
                style.size ||
                preset?.size ||
                globalConfig.defaults?.size ||
                "md",
            radius:
                style.radius ||
                preset?.radius ||
                globalConfig.defaults?.radius ||
                "md",
            fullWidth:
                style.fullWidth !== undefined
                    ? style.fullWidth
                    : globalConfig.defaults?.fullWidth !== undefined
                    ? globalConfig.defaults.fullWidth
                    : true,
        };
    }, [style, globalConfig]);

    const labelConfig = {
        text: label.text,
        show:
            label.show !== undefined
                ? label.show
                : globalConfig.label?.show !== false,
        required: label.required || globalConfig.label?.required || false,
        requiredText: label.requiredText,
        className: label.className || globalConfig.classNames?.label,
    };

    // Resolve size once to ensure consistency
    const resolvedSize = resolveResponsiveValue(styleConfig.size, "md");

    // Build input className with responsive support
    const inputClassName = cn(
        inputVariants({
            variant: styleConfig.variant,
            size: resolvedSize,
            radius: styleConfig.radius,
            status,
            fullWidth: styleConfig.fullWidth,
        }),
        // Add responsive size classes
        getResponsiveClasses(styleConfig.size, ""),
        typeConfig.type !== "checkbox" &&
            typeConfig.type !== "otp" &&
            "className" in typeConfig
            ? typeConfig.className
            : "",
        globalConfig.classNames?.input,
        "dark:bg-gray-900"
    );

    // Build label className
    const labelClassName = cn(
        labelVariants({
            size: resolvedSize,
            status,
            required: labelConfig.required,
        }),
        labelConfig.className
    );

    const renderInput = (field: ControllerRenderProps<TFieldValues>) => {
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
                        className={inputClassName}
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
                        rows={"rows" in typeConfig ? typeConfig.rows : 4}
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
                        {...field}
                        options={typeConfig.options}
                        placeholder={typeConfig.placeholder}
                        disabled={typeConfig.disabled}
                        className={inputClassName}
                        size={resolvedSize}
                    />
                );

            case "checkbox":
                return (
                    <CheckBox
                        checked={field.value}
                        onChange={() => field.onChange(!field.value)}
                        label={typeConfig.label}
                        disabled={typeConfig.disabled}
                        className={typeConfig.className}
                        checkedIcon={typeConfig.checkedIcon}
                        uncheckedIcon={typeConfig.uncheckedIcon}
                        size={resolvedSize}
                    />
                );

            case "otp":
                return (
                    <OTP
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                        onComplete={typeConfig.onComplete}
                        length={typeConfig.length}
                        resendable={typeConfig.resendable}
                        resendInterval={typeConfig.resendInterval}
                        onResend={typeConfig.onResend}
                        disabled={typeConfig.disabled}
                        autoFocus={typeConfig.autoFocus}
                        size={resolvedSize}
                    />
                );

            case "phone":
                return (
                    <PhoneInput
                        value={field.value}
                        onChange={(phoneValue, country: any) => {
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
                        inputClass={cn(inputClassName, "w-full!")}
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
                        {...field}
                        mode={typeConfig.mode}
                        placeholder={typeConfig.placeholder}
                        disabled={typeConfig.disabled}
                        className={inputClassName}
                        size={resolvedSize}
                    />
                );

            case "file":
                return (
                    <FileInput
                        {...field}
                        accept={typeConfig.accept}
                        multiple={typeConfig.multiple}
                        maxSize={typeConfig.maxSize}
                        disabled={typeConfig.disabled}
                        className={inputClassName}
                    />
                );

            case "search":
                return (
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            {...field}
                            type="search"
                            className={cn(inputClassName, "pl-10")}
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
                        {field.value && (
                            <button
                                type="button"
                                onClick={() => field.onChange("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                );

            default:
                return (
                    <div className="relative">
                        <input
                            {...field}
                            type={inputType}
                            className={inputClassName}
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
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="w-5 h-5" />
                                ) : (
                                    <EyeIcon className="w-5 h-5" />
                                )}
                            </button>
                        )}
                    </div>
                );
        }
    };

    if (typeConfig.type === "checkbox") {
        return (
            <Controller<TFieldValues>
                name={name}
                control={control}
                render={({ field }) => (
                    <div className={cn("flex flex-col", layout.className)}>
                        {renderInput(field)}
                        {validation.showError !== false && validation.error && (
                            <p
                                className={cn(
                                    "text-sm text-red-600 dark:text-red-400 mt-1",
                                    globalConfig.classNames?.error
                                )}
                            >
                                {validation.error}
                            </p>
                        )}
                        {label.requiredText && (
                            <p
                                className={cn(
                                    "text-xs text-gray-500 dark:text-gray-400 mt-1",
                                    globalConfig.classNames?.helper
                                )}
                            >
                                {label.requiredText}
                            </p>
                        )}
                    </div>
                )}
            />
        );
    }

    return (
        <FormFieldWrapper
            label={labelConfig}
            validation={validation}
            layout={layout}
            labelClassName={labelClassName}
            size={resolvedSize}
        >
            <Controller<TFieldValues>
                name={name}
                control={control}
                render={({ field }) => renderInput(field)}
            />
        </FormFieldWrapper>
    );
};
