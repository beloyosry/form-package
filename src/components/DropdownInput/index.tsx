import { useState, useRef, useEffect } from "react";
import { inputVariants } from "../../styles/variants";
import { cn } from "../../utils/cn";
import { ChevronDown, Search, X, PackageX, Check } from "lucide-react";
import { DropdownInputProps } from "./types";

export const DropdownInput: React.FC<DropdownInputProps> = ({
    field,
    config,
    variant = "default",
    size = "md",
    radius = "md",
    onKeyDown,
    format,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);
    const filteredOptions = config.options?.filter((option) =>
        option?.value?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
                setSearchQuery("");
                setIsSearchOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (!filteredOptions) return;

            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    setHighlightedIndex((prev) =>
                        prev < filteredOptions.length - 1 ? prev + 1 : 0
                    );
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    setHighlightedIndex((prev) =>
                        prev > 0 ? prev - 1 : filteredOptions.length - 1
                    );
                    break;
                case "Enter":
                    e.preventDefault();
                    if (highlightedIndex >= 0) {
                        field.onChange(filteredOptions[highlightedIndex].key);
                        setIsOpen(false);
                        setSearchQuery("");
                    }
                    break;
                case "Escape":
                    setIsOpen(false);
                    setSearchQuery("");
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, highlightedIndex, field]);

    const selectedOption = config.options?.find(
        (o) => String(o.key) === String(field.value)
    );

    return (
        <div
            ref={dropdownRef}
            className={cn(
                "relative",
                config.width === "full" ? "w-full" : "w-fit"
            )}
        >
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => !config.disabled && setIsOpen(!isOpen)}
                disabled={config.disabled}
                className={cn(
                    inputVariants({ variant, size, radius, status: "default" }),
                    "group relative flex items-center justify-between gap-3",
                    "transition-all duration-300 ease-out",
                    "overflow-hidden",
                    isOpen &&
                        "ring-2 ring-primary-500 border-primary-500 shadow-lg shadow-primary-500/20",
                    config.disabled && "cursor-not-allowed opacity-50",
                    !config.disabled &&
                        !isOpen &&
                        "hover:border-primary-400 hover:shadow-md dark:hover:border-primary-500",
                    config.className
                )}
            >
                {/* Background linear effect on hover */}
                <div
                    className={cn(
                        "absolute inset-0 bg-linear-to-r from-primary-50/0 via-primary-50 to-primary-50/0 dark:from-primary-950/0 dark:via-primary-950/50 dark:to-primary-950/0",
                        "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                        config.disabled && "hidden"
                    )}
                />

                <span
                    className={cn(
                        "relative z-10 flex-1 text-left font-medium truncate",
                        selectedOption
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-400 dark:text-gray-500"
                    )}
                >
                    {selectedOption ? (
                        <span className="flex items-center gap-2">
                            <Check
                                size={16}
                                className="text-primary-500 shrink-0"
                            />
                            {selectedOption.value}
                        </span>
                    ) : (
                        config.placeholder || "Select an option"
                    )}
                </span>

                <ChevronDown
                    size={20}
                    className={cn(
                        "relative z-10 shrink-0 text-gray-500 dark:text-gray-400",
                        "transition-all duration-300 ease-out",
                        isOpen && "rotate-180 text-primary-500",
                        !config.disabled &&
                            "group-hover:text-primary-500 dark:group-hover:text-primary-400"
                    )}
                />
            </button>

            {/* Dropdown Panel */}
            {isOpen && !config.disabled && (
                <div
                    className={cn(
                        "absolute z-50 w-full mt-2",
                        "bg-white dark:bg-gray-900",
                        "border border-gray-200 dark:border-gray-700",
                        "rounded-xl shadow-2xl",
                        "overflow-hidden",
                        "animate-in fade-in slide-in-from-top-2 duration-200"
                    )}
                >
                    {/* Search Bar */}
                    {config.searchable && (
                        <div className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
                            {isSearchOpen ? (
                                <div className="p-3">
                                    <div className="relative flex items-center gap-2 bg-linear-to-r from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 rounded-lg px-3 py-2.5 border border-primary-200 dark:border-gray-700">
                                        <Search
                                            size={18}
                                            className="text-primary-500 dark:text-primary-400 shrink-0 animate-pulse"
                                        />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                const formatted = format
                                                    ? format(value)
                                                    : value;
                                                setSearchQuery(formatted);
                                                setHighlightedIndex(0);
                                            }}
                                            onKeyDown={onKeyDown}
                                            placeholder={
                                                config.searchPlaceholder ||
                                                "Type to search..."
                                            }
                                            className="flex-1 bg-transparent outline-none text-sm font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:text-white"
                                            autoFocus
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsSearchOpen(false);
                                                setSearchQuery("");
                                            }}
                                            className="p-1.5 hover:bg-white dark:hover:bg-gray-700 rounded-md transition-all duration-150 shrink-0 hover:scale-110"
                                        >
                                            <X
                                                size={16}
                                                className="text-gray-500 dark:text-gray-400"
                                            />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setIsSearchOpen(true)}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-linear-to-r hover:from-primary-50 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:to-gray-800 transition-all duration-200 font-medium group"
                                >
                                    <Search
                                        size={18}
                                        className="shrink-0 group-hover:text-primary-500 transition-colors"
                                    />
                                    <span className="text-sm">
                                        {config.searchPlaceholder ||
                                            "Search options..."}
                                    </span>
                                </button>
                            )}
                        </div>
                    )}

                    {/* Options List */}
                    <div
                        ref={optionsRef}
                        className="max-h-64 overflow-y-auto overscroll-contain scroll-smooth custom-scrollbar"
                    >
                        {filteredOptions && filteredOptions.length > 0 ? (
                            <div className="py-1">
                                {filteredOptions.map((option, idx) => {
                                    const isSelected =
                                        String(field.value) ===
                                        String(option.key);
                                    const isHighlighted =
                                        highlightedIndex === idx;

                                    return (
                                        <button
                                            key={option.key}
                                            type="button"
                                            onClick={() => {
                                                field.onChange(option.key);
                                                setIsOpen(false);
                                                setSearchQuery("");
                                                setIsSearchOpen(false);
                                            }}
                                            onMouseEnter={() =>
                                                setHighlightedIndex(idx)
                                            }
                                            className={cn(
                                                "w-full text-left px-4 py-3 transition-all duration-150 font-medium text-sm",
                                                "flex items-center justify-between gap-3",
                                                "border-l-4",
                                                "group/item relative overflow-hidden",
                                                isSelected
                                                    ? "bg-linear-to-r from-primary-50 via-primary-50 to-blue-50 dark:from-primary-900/40 dark:via-primary-900/30 dark:to-blue-900/20 text-primary-700 dark:text-primary-300 border-l-primary-500 font-semibold shadow-sm"
                                                    : isHighlighted
                                                    ? "bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-l-gray-300 dark:border-l-gray-600"
                                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 border-l-transparent"
                                            )}
                                        >
                                            {/* Hover shimmer effect */}
                                            <div
                                                className={cn(
                                                    "absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent dark:via-white/5",
                                                    "opacity-0 group-hover/item:opacity-100",
                                                    "transition-opacity duration-300",
                                                    "-translate-x-full group-hover/item:translate-x-full",
                                                    "transition-transform duration-700"
                                                )}
                                            />

                                            <span className="relative z-10 truncate">
                                                {option.value}
                                            </span>

                                            {isSelected && (
                                                <Check
                                                    size={18}
                                                    className="relative z-10 text-primary-500 dark:text-primary-400 shrink-0 animate-in zoom-in duration-200"
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="px-4 py-16 text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-linear-to-r from-primary-200 to-blue-200 dark:from-primary-900 dark:to-blue-900 blur-xl opacity-50 animate-pulse" />
                                        <PackageX
                                            size={48}
                                            className="relative text-gray-300 dark:text-gray-600"
                                        />
                                    </div>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-semibold mb-1">
                                    {config.emptyText || "No results found"}
                                </p>
                                <p className="text-gray-400 dark:text-gray-500 text-xs">
                                    Try adjusting your search
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Custom scrollbar styles */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
                .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #374151;
                }
                .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #4b5563;
                }
            `}</style>
        </div>
    );
};
