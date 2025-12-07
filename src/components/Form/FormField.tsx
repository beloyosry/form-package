import { FC } from "react";
import { FormFieldProps } from "./types";
import { cn } from "../../utils/cn";

export const FormField: FC<FormFieldProps> = ({
    children,
    layout = {},
    style = {},
}) => {
    const { title, subtitle, separator = false, cols = "3" } = layout;

    const {
        className,
        titleClassName,
        subtitleClassName,
        separatorClassName,
        gridClassName,
    } = style;

    const getGridColsClass = () => {
        switch (cols) {
            case "1":
                return "lg:grid-cols-1";
            case "2":
                return "lg:grid-cols-2";
            case "3":
                return "lg:grid-cols-3";
            case "4":
                return "lg:grid-cols-4";
            case "5":
                return "lg:grid-cols-5";
            case "6":
                return "lg:grid-cols-6";
            default:
                return "lg:grid-cols-3";
        }
    };

    return (
        <div className={cn("w-full", className)}>
            {/* Title Section */}
            {title && (
                <div className={cn("mb-6", titleClassName)}>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {title}
                    </h2>
                    {subtitle && (
                        <p
                            className={cn(
                                "mt-1 text-sm text-gray-600 dark:text-gray-400",
                                subtitleClassName
                            )}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>
            )}

            {/* Separator */}
            {separator && (
                <div className={cn("separator", separatorClassName)} />
            )}

            {/* Grid Container */}
            <div
                className={cn(
                    `grid md:grid-cols-2 ${getGridColsClass()} gap-4 px-3`,
                    gridClassName
                )}
            >
                {children}
            </div>
        </div>
    );
};
