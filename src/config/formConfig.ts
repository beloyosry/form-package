// src/config/formConfig.ts

/**
 * Responsive value type that supports breakpoint-specific values
 * Can be a single value or an object with breakpoint keys
 */
export type ResponsiveValue<T> =
    | T
    | {
          base?: T | null;
          sm?: T | null;
          md?: T | null;
          lg?: T | null;
          xl?: T | null;
          "2xl"?: T | null;
      }
    | null
    | undefined;

export interface FormPackageConfig {
    defaults?: {
        variant?: "default" | "filled" | "outlined" | "ghost" | "soft";
        size?: ResponsiveValue<"xs" | "sm" | "md" | "lg" | "xl">;
        radius?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
        fullWidth?: boolean;
    };
    button?: {
        variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
        size?: ResponsiveValue<"xs" | "sm" | "md" | "lg" | "xl">;
        radius?: "none" | "sm" | "md" | "lg" | "xl" | "full";
    };
    label?: {
        show?: boolean;
        required?: boolean;
        className?: string;
    };
    validation?: {
        showError?: boolean;
        showSuccess?: boolean;
    };
    layout?: {
        gap?: ResponsiveValue<string>;
        columns?: ResponsiveValue<number>;
        removeBorder?: boolean;
        noPadding?: boolean;
    };
    classNames?: {
        input?: string;
        label?: string;
        error?: string;
        success?: string;
        helper?: string;
        wrapper?: string;
        form?: string;
        button?: string;
    };
}

let globalConfig: FormPackageConfig = {};

/**
 * Configure global defaults for the form package
 * @param config - The configuration object
 */
export function configureFormPackage(config: FormPackageConfig): void {
    globalConfig = { ...globalConfig, ...config };
}

/**
 * Get the current global configuration
 */
export function getFormConfig(): FormPackageConfig {
    return globalConfig;
}

/**
 * Reset configuration to defaults
 */
export function resetFormConfig(): void {
    globalConfig = {};
}
