"use client";

import { useEffect } from "react";
import { BookingWrapperProps } from "../../utils/types";
import { useProperty } from "@/utils/store";
import { Booking } from "@/utils/types";
import BookingCalendar from "./BookingCalendar";
import BookingContainer from "./BookingContainer";

function BookingWrapper({ propertyId, price, bookings }: BookingWrapperProps) {
  useEffect(() => {
    useProperty.setState({ propertyId, price, bookings });
  }, []);

  return (
    <>
      <BookingCalendar />
      <BookingContainer />
    </>
  );
}
export default BookingWrapper;
