"use client";
import { useEffect, useState } from "react";
import { useProperty } from "@/utils/store";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";

import {
  generateDisabledDates,
  generateDateRange,
  defaultSelected,
  generateBlockedPeriods,
} from "@/utils/calendar";

function BookingCalendar() {
  const currentDate = new Date();
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  const bookings = useProperty((state) => state.bookings);
  // console.log(bookings);
  const { toast } = useToast();

  const blockedPeriods = generateBlockedPeriods({
    bookings,
    today: currentDate,
  });

  const unavailableDates = generateDisabledDates(blockedPeriods);
  console.log(unavailableDates);

  useEffect(() => {
    const selectedRange = generateDateRange(range);
    const isDisabledDateIncluded = selectedRange.some((date) => {
      if (unavailableDates[date]) {
        setRange(defaultSelected);
        toast({
          description: "Some dates are already booked. Please select again.",
        });
        return true;
      }
      return false;
    });

    useProperty.setState({ range });
  }, [range]);

  return (
    <Calendar
      mode='range'
      defaultMonth={currentDate}
      selected={range}
      onSelect={setRange}
      disabled={blockedPeriods}
      className='mb-2'
    />
  );
}
export default BookingCalendar;
