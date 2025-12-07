import { PaperclipIcon, X } from "lucide-react";
import { inputVariants } from "../../styles/variants";
import { cn } from "../../utils/cn";
import { FileInputProps } from "./types";
import { useRef } from "react";

export const FileInput: React.FC<FileInputProps> = ({
    field,
    label = "Upload File",
    icon,
    accept,
    maxSize,
    disabled = false,
    className = "",
    variant = "default",
    size = "md",
    radius = "md",
    onKeyDown,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];

            // Check file size if maxSize is specified
            if (maxSize && file.size > maxSize) {
                alert(`File size exceeds ${maxSize / 1024 / 1024}MB`);
                return;
            }

            field.onChange(file);
        }
    };

    const handleRemoveFile = () => {
        field.onChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-2">
            <label
                className={cn(
                    inputVariants({ variant, size, radius, status: "default" }),
                    "flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700",
                    disabled && "cursor-not-allowed opacity-50",
                    className
                )}
            >
                {icon || <PaperclipIcon size={20} />}
                <span>{label}</span>
                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    onKeyDown={onKeyDown}
                    accept={accept}
                    disabled={disabled}
                    className="hidden"
                />
            </label>

            {field.value && typeof field.value === "object" && (
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate flex-1">
                        {(field.value as File).name}
                    </span>
                    <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="ml-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}
        </div>
    );
};
