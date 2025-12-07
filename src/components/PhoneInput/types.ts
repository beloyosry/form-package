import { ControllerRenderProps } from "react-hook-form";
import { PhoneData } from "../Form/types";

export interface PhoneInputComponentProps {
    field: ControllerRenderProps<any, any>;
    onPhoneExtracted?: (data: PhoneData) => void;
    defaultCountry?: string;
    preferredCountries?: string[];
    disabled?: boolean;
    placeholder?: string;
}
