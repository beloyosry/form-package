// src/components/Form/Form.tsx
import { FieldValues } from "react-hook-form";
import { FormProps } from "./types";
import { FormProvider } from "./FormContext";
import { FormField } from "./FormField";
import { FormButtons } from "./FormButtons";
import { FormInputWrapper } from "./FormInputWrapper";
import { cn } from "../../utils/cn";
import { getFormConfig } from "../../config/formConfig";
import {
    getResponsiveGridClasses,
    getResponsiveGapClasses,
} from "../../utils/responsive";

function FormRoot<T extends FieldValues = FieldValues>({
    children,
    control,
    errors,
    onSubmit,
    layout = {},
}: FormProps<T>) {
    const globalConfig = getFormConfig();

    const {
        className,
        formClassName,
        removeBorder = globalConfig.layout?.removeBorder || false,
        noPadding = globalConfig.layout?.noPadding || false,
        gap = globalConfig.layout?.gap,
        columns = globalConfig.layout?.columns,
    } = layout;

    return (
        <FormProvider control={control} errors={errors}>
            <div
                className={cn(
                    "w-full",
                    className,
                    globalConfig.classNames?.wrapper
                )}
            >
                <form
                    onSubmit={onSubmit}
                    className={cn(
                        "w-full grid",
                        !removeBorder &&
                            "border border-gray-200 dark:border-gray-700 rounded-lg",
                        !noPadding && "p-6",
                        getResponsiveGridClasses(columns),
                        getResponsiveGapClasses(gap),
                        formClassName,
                        globalConfig.classNames?.form
                    )}
                >
                    {children}
                </form>
            </div>
        </FormProvider>
    );
}

// Create the compound component with proper typing
const Form = Object.assign(FormRoot, {
    Field: FormField,
    Input: FormInputWrapper,
    Buttons: FormButtons,
});

// Export both named and default
export { Form };
export default Form;
