// src/components/FileInput/index.tsx
import { useState } from "react";
import { FileInputProps } from "./types";
import { cn } from "../../utils/cn";
import { Upload, X, File } from "lucide-react";

export const FileInput = ({
    value,
    onChange,
    accept,
    multiple = false,
    maxSize,
    disabled = false,
    className,
}: FileInputProps) => {
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateFile = (file: File): boolean => {
        setError(null);

        if (maxSize && file.size > maxSize) {
            setError(
                `File size exceeds ${(maxSize / 1024 / 1024).toFixed(2)}MB`
            );
            return false;
        }

        if (accept) {
            const acceptedTypes = accept.split(",").map((type) => type.trim());
            const fileType = file.type;
            const fileExtension = "." + file.name.split(".").pop();

            const isAccepted = acceptedTypes.some(
                (type) =>
                    type === fileType || type === fileExtension || type === "*"
            );

            if (!isAccepted) {
                setError(`File type not accepted. Allowed: ${accept}`);
                return false;
            }
        }

        return true;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        if (multiple) {
            const validFiles = Array.from(files).filter(validateFile);
            onChange(validFiles.length > 0 ? validFiles : null);
        } else {
            const file = files[0];
            if (validateFile(file)) {
                onChange(file);
            }
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (disabled) return;

        const files = e.dataTransfer.files;
        if (!files || files.length === 0) return;

        if (multiple) {
            const validFiles = Array.from(files).filter(validateFile);
            onChange(validFiles.length > 0 ? validFiles : null);
        } else {
            const file = files[0];
            if (validateFile(file)) {
                onChange(file);
            }
        }
    };

    const handleRemove = (index?: number) => {
        if (multiple && Array.isArray(value) && index !== undefined) {
            const newFiles = value.filter((_, i) => i !== index);
            onChange(newFiles.length > 0 ? newFiles : null);
        } else {
            onChange(null);
        }
    };

    const files = value ? (Array.isArray(value) ? value : [value]) : [];

    return (
        <div className={cn("w-full", className)}>
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={cn(
                    "relative rounded-lg border-2 border-dashed transition-all duration-200",
                    "flex flex-col items-center justify-center p-6",
                    dragActive
                        ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                        : "border-gray-300 dark:border-gray-700",
                    !disabled &&
                        "hover:border-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800/50",
                    disabled && "opacity-50 cursor-not-allowed"
                )}
            >
                <input
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleChange}
                    disabled={disabled}
                    className="sr-only"
                    id="file-upload"
                />
                <label
                    htmlFor="file-upload"
                    className={cn(
                        "flex flex-col items-center cursor-pointer",
                        disabled && "cursor-not-allowed"
                    )}
                >
                    <Upload className="w-10 h-10 text-gray-400 mb-3" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <span className="font-semibold text-primary-600 dark:text-primary-400">
                            Click to upload
                        </span>{" "}
                        or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                        {accept ? `Accepted: ${accept}` : "Any file type"}
                        {maxSize &&
                            ` (Max: ${(maxSize / 1024 / 1024).toFixed(2)}MB)`}
                    </p>
                </label>
            </div>

            {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {error}
                </p>
            )}

            {files.length > 0 && (
                <div className="mt-4 space-y-2">
                    {files.map((file, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                        >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <File className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {(file.size / 1024).toFixed(2)} KB
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemove(index)}
                                disabled={disabled}
                                className={cn(
                                    "p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors",
                                    disabled && "cursor-not-allowed opacity-50"
                                )}
                            >
                                <X className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
