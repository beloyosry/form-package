import { FieldValues } from "react-hook-form";
import { FormProps } from "./types";
import { FormProvider } from "./FormContext";
import { FormField } from "./FormField";
import { FormButtons } from "./FormButtons";
import { FormInputWrapper } from "./FormInputWrapper";
import { cn } from "../../utils/cn";

function FormRoot<T extends FieldValues = FieldValues>({
    children,
    control,
    errors,
    onSubmit,
    layout = {},
}: FormProps<T>) {
    const {
        className,
        formClassName,
        removeBorder = false,
        noPadding = false,
    } = layout;

    return (
        <FormProvider value={{ control, errors } as any}>
            <div
                className={cn(
                    !removeBorder && "border-wrapper",
                    !noPadding && "p-8",
                    className
                )}
            >
                <form
                    onSubmit={onSubmit}
                    className={cn("space-y-6", formClassName)}
                >
                    {children}
                </form>
            </div>
        </FormProvider>
    );
}

// Attach sub-components
FormRoot.Field = FormField;
FormRoot.Input = FormInputWrapper;
FormRoot.Buttons = FormButtons;

// Export with proper typing
export const Form = FormRoot as typeof FormRoot & {
    Field: typeof FormField;
    Input: typeof FormInputWrapper;
    Buttons: typeof FormButtons;
};

// Also export as default
export default Form;
