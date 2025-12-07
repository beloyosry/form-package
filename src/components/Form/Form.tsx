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

// Create the compound component with proper typing
const Form = Object.assign(FormRoot, {
    Field: FormField,
    Input: FormInputWrapper,
    Buttons: FormButtons,
});

// Export both named and default
export { Form };
export default Form;
