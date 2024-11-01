import { calculateDaysBetween } from "./calendar";

type BookingDetails = {
  checkIn: Date;
  checkOut: Date;
  price: number;
};

export const calculateTotals = ({ checkIn, checkOut, price }: BookingDetails) => {
  const totalNights = calculateDaysBetween({ checkIn, checkOut });
  const subtotal = totalNights * price;
  const tax = subtotal * 0.07;
  const orderTotal = subtotal + tax;
  return { totalNights, subtotal, tax, orderTotal };
};
