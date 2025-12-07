import { useState } from "react";
import { PhoneInputComponentProps } from "./types";
import PhoneInput from "react-phone-input-2";

export const PhoneInputComponent: React.FC<PhoneInputComponentProps> = ({
    field,
    onPhoneExtracted,
    defaultCountry = "us",
    preferredCountries = ["us", "gb", "ca"],
    disabled = false,
    placeholder = "Enter phone number",
}) => {
    const [phone, setPhone] = useState(field.value || "");

    return (
        <PhoneInput
            country={defaultCountry}
            value={phone}
            onChange={(phoneValue, country: any) => {
                setPhone(phoneValue);

                const phoneCode = country.dialCode;
                const phoneNumberOnly = phoneValue.substring(
                    country.dialCode.length
                );

                field.onChange(phoneValue);

                if (onPhoneExtracted) {
                    onPhoneExtracted({
                        fullNumber: phoneValue,
                        phoneCode,
                        phoneNumber: phoneNumberOnly,
                    });
                }
            }}
            inputClass="w-full! rounded-lg! h-11! focus:ring-primary-500! focus:border-2! focus:border-primary-500! shadow-none!"
            buttonClass="focus:ring-primary-500! focus:border-2! focus:border-primary-500! shadow-none!"
            dropdownClass="border border-primary-500!"
            disabled={disabled}
            placeholder={placeholder}
            preferredCountries={preferredCountries}
            enableSearch
            disableSearchIcon
        />
    );
};
