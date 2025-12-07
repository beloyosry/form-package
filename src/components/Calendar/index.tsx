import { useState, useEffect, useMemo } from "react";
import { CalendarProps } from "./types";
import { cva } from "class-variance-authority";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format as dateFnsFormat } from "date-fns";
import { cn } from "../../utils/cn";

export const formatDate = {
    apiFormat: (date: Date): string =>
        dateFnsFormat(date, "yyyy-MM-dd HH:mm:ss"),
    readableDate: (date: Date): string => dateFnsFormat(date, "PP"),
    shortDate: (date: Date): string => dateFnsFormat(date, "dd/MM/yy"),
    dateTime: (date: Date): string => dateFnsFormat(date, "PPp"),
};

const calendarVariants = cva(
    "bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg",
    {
        variants: {
            size: {
                default: "w-[350px]",
                small: "w-[280px]",
                large: "w-[420px]",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
);

const dayVariants = cva(
    "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors cursor-pointer",
    {
        variants: {
            variant: {
                default:
                    "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
                weekend:
                    "text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700",
                selected: "bg-primary-500 text-white hover:bg-primary-600",
                highlighted:
                    "bg-primary-100 text-gray-700 hover:bg-primary-200 dark:bg-primary-900/30",
                inactive: "text-gray-300 cursor-not-allowed dark:text-gray-600",
                today: "text-gray-900 font-bold ring-2 ring-primary-500 dark:text-white",
                disabled:
                    "text-gray-300 cursor-not-allowed hover:bg-transparent dark:text-gray-600",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export const Calendar = ({
    initialDate = new Date(),
    selectedDate: externalSelectedDate,
    onDateSelect,
    highlightedDates = [],
    minDate,
    maxDate,
    className,
    classNames = {},
    size = "default",
    firstDayOfWeek = 1,
}: CalendarProps) => {
    // Use useMemo to prevent initialDate from causing re-renders
    const memoizedInitialDate = useMemo(
        () => initialDate,
        [initialDate.getTime()] // Only re-compute when the actual time changes
    );

    const [selectedDate, setSelectedDate] = useState(
        externalSelectedDate || memoizedInitialDate
    );
    const [currentDate, setCurrentDate] = useState(memoizedInitialDate);

    // Update selected date when external prop changes
    useEffect(() => {
        if (externalSelectedDate) {
            setSelectedDate(externalSelectedDate);
        }
    }, [externalSelectedDate?.getTime()]); // Use getTime() to compare date values

    // Remove this useEffect - it's causing the infinite loop
    // The initial date should only be set once during initialization
    // useEffect(() => {
    //     if (initialDate) {
    //         setCurrentDate(initialDate);
    //     }
    // }, [initialDate]);

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const dayOfWeek =
        firstDayOfWeek === 1
            ? firstDayOfMonth.getDay() === 0
                ? 6
                : firstDayOfMonth.getDay() - 1
            : firstDayOfMonth.getDay();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const monthName = new Intl.DateTimeFormat("en-US", {
        month: "long",
    }).format(currentDate);

    const daysOfWeek =
        firstDayOfWeek === 1
            ? ["M", "T", "W", "T", "F", "S", "S"]
            : ["S", "M", "T", "W", "T", "F", "S"];

    const handleDateClick = (day: number) => {
        const newDate = new Date(currentYear, currentMonth, day);

        if (isDateDisabled(newDate)) return;

        setSelectedDate(newDate);
        if (onDateSelect) {
            onDateSelect(newDate);
        }
    };

    const isDateDisabled = (date: Date) => {
        if (minDate && date < minDate) return true;
        if (maxDate && date > maxDate) return true;
        return false;
    };

    const isHighlighted = (day: number) => {
        return highlightedDates.some(
            (date) =>
                date.getDate() === day &&
                date.getMonth() === currentMonth &&
                date.getFullYear() === currentYear
        );
    };

    const isSelected = (day: number) => {
        return (
            selectedDate?.getDate() === day &&
            selectedDate?.getMonth() === currentMonth &&
            selectedDate?.getFullYear() === currentYear
        );
    };

    const isWeekend = (dayIndex: number) => {
        const weekdayIndex = (dayIndex + dayOfWeek) % 7;
        return firstDayOfWeek === 1
            ? weekdayIndex === 5 || weekdayIndex === 6
            : weekdayIndex === 0 || weekdayIndex === 6;
    };

    const isToday = (day: number) => {
        const today = new Date();
        return (
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear()
        );
    };

    const generateCalendarGrid = () => {
        const days = [];

        for (let i = 0; i < dayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} className="w-8 h-8" />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const disabled = isDateDisabled(date);

            let variant: any = "default";
            if (disabled) {
                variant = "disabled";
            } else if (isSelected(day)) {
                variant = "selected";
            } else if (isHighlighted(day)) {
                variant = "highlighted";
            } else if (isToday(day)) {
                variant = "today";
            } else if (isWeekend((dayOfWeek + day - 1) % 7)) {
                variant = "weekend";
            }

            days.push(
                <button
                    key={day}
                    type="button"
                    onClick={() => handleDateClick(day)}
                    disabled={disabled}
                    className={cn(
                        dayVariants({ variant }),
                        classNames.dayCell,
                        variant === "selected" && classNames.daySelected,
                        variant === "highlighted" && classNames.dayHighlighted,
                        variant === "today" && classNames.dayToday,
                        variant === "disabled" && classNames.dayDisabled,
                        variant === "weekend" && classNames.dayWeekend
                    )}
                >
                    {day}
                </button>
            );
        }

        return days;
    };

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    return (
        <div
            className={cn(
                calendarVariants({ size }),
                classNames.container,
                className
            )}
        >
            <div
                className={cn(
                    "flex items-center justify-between mb-4",
                    classNames.header
                )}
            >
                <button
                    type="button"
                    onClick={goToPreviousMonth}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors dark:hover:bg-gray-700"
                >
                    <ChevronLeft size={20} />
                </button>
                <h2
                    className={cn(
                        "text-lg font-semibold",
                        classNames.monthYear
                    )}
                >
                    {monthName} {currentYear}
                </h2>
                <button
                    type="button"
                    onClick={goToNextMonth}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors dark:hover:bg-gray-700"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            <div
                className={cn(
                    "grid grid-cols-7 gap-1 mb-2",
                    classNames.daysGrid
                )}
            >
                {daysOfWeek.map((day, index) => (
                    <div
                        key={day + index}
                        className={`text-center text-sm font-medium text-gray-500 ${
                            (
                                firstDayOfWeek === 1
                                    ? index >= 5
                                    : index === 0 || index === 6
                            )
                                ? "text-red-500"
                                : ""
                        }`}
                    >
                        {day}
                    </div>
                ))}
            </div>

            <div className={cn("grid grid-cols-7 gap-1", classNames.daysGrid)}>
                {generateCalendarGrid()}
            </div>
        </div>
    );
};
