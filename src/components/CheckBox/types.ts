export interface CheckBoxProps {
    checked: boolean;
    onChange: () => void;
    label?: string;
    disabled?: boolean;
    className?: string;
    classNames?: {
        container?: string;
        checkbox?: string;
        active?: string;
        inactive?: string;
        checkedIcon?: string;
        label?: string;
    };
    checkedIcon?: React.ReactNode;
    uncheckedIcon?: React.ReactNode;
    size?: "sm" | "md" | "lg";
    variant?: "default" | "outlined" | "filled";
}
