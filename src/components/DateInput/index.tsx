import { useEffect, useRef, useState } from "react";
import { Calendar, formatDate } from "../Calendar";
import { cn } from "../../utils/cn";
import { inputVariants } from "../../styles/variants";
import { CalendarIcon } from "lucide-react";
import { DateInputProps } from "./types";

export const DateInput: React.FC<DateInputProps> = ({
    field,
    format: dateFormat = "datetime",
    minDate,
    maxDate,
    highlightedDates = [],
    disabled = false,
    placeholder = "Select date",
    className = "",
    variant = "default",
    size = "md",
    radius = "md",
}) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(e.target as Node)
            ) {
                setShowCalendar(false);
            }
        };

        if (showCalendar) {
            setTimeout(() => {
                document.addEventListener("mousedown", handleClickOutside);
            }, 0);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showCalendar]);

    const handleDateSelect = (date: Date) => {
        field.onChange(date.toISOString());
        setShowCalendar(false);
    };

    const formatDisplayValue = (value: string) => {
        if (!value) return "";
        const date = new Date(value);
        switch (dateFormat) {
            case "date":
                return formatDate.readableDate(date);
            case "datetime":
                return formatDate.dateTime(date);
            case "time":
                return date.toLocaleTimeString();
            default:
                return formatDate.dateTime(date);
        }
    };

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => !disabled && setShowCalendar(!showCalendar)}
                disabled={disabled}
                className={cn(
                    inputVariants({ variant, size, radius, status: "default" }),
                    "flex items-center justify-between",
                    className
                )}
            >
                <span className={cn(!field.value && "text-gray-400")}>
                    {field.value
                        ? formatDisplayValue(field.value)
                        : placeholder}
                </span>
                <CalendarIcon size={20} className="text-gray-400" />
            </button>

            {showCalendar && !disabled && (
                <div ref={calendarRef} className="absolute z-50 mt-2">
                    <Calendar
                        selectedDate={
                            field.value ? new Date(field.value) : undefined
                        }
                        onDateSelect={handleDateSelect}
                        highlightedDates={highlightedDates}
                        minDate={minDate}
                        maxDate={maxDate}
                    />
                </div>
            )}
        </div>
    );
};
