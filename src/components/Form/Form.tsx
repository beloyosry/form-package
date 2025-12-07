import { FieldValues } from "react-hook-form";
import { FormProps } from "./types";
import { FormProvider } from "./FormContext";
import { FormField } from "./FormField";
import { FormButtons } from "./FormButtons";
import { FormInputWrapper } from "./FormInputWrapper";
import { cn } from "../../utils/cn";

const FormRoot = <T extends FieldValues = FieldValues>({
    children,
    control,
    errors,
    onSubmit,
    layout = {},
}: FormProps<T>) => {
    const {
        className,
        formClassName,
        removeBorder = false,
        noPadding = false,
    } = layout;

    return (
        <FormProvider value={{ control, errors }}>
            <div
                className={cn(
                    "dark:bg-black-300",
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
};

// Compound Component
export const Form = Object.assign(FormRoot, {
    Field: FormField,
    Input: FormInputWrapper,
    Buttons: FormButtons,
}) as typeof FormRoot & {
    Field: typeof FormField;
    Input: typeof FormInputWrapper;
    Buttons: typeof FormButtons;
};
