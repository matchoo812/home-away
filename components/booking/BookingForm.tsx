"use client";

import { calculateTotals } from "@/utils/calculateTotals";
import { useProperty } from "@/utils/store";
import { Card, CardTitle } from "../ui/card";
import { formatCurrency } from "@/utils/format";
import { Separator } from "../ui/separator";

function BookingForm() {
  const { range, price } = useProperty((state) => state);
  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;
  const { totalNights, subtotal, tax, orderTotal } = calculateTotals({
    checkIn,
    checkOut,
    price,
  });

  return (
    <Card className='p-8 mb-4'>
      <CardTitle className='mb-8'>Summary</CardTitle>
      <FormRow label={`$${price} x ${totalNights} nights`} amount={subtotal} />
      <FormRow label='Tax' amount={tax} />
      <Separator />
      <CardTitle className='mt-8'>
        <FormRow label='Total Amount' amount={orderTotal} />
      </CardTitle>
    </Card>
  );
}

function FormRow({ label, amount }: { label: string; amount: number }) {
  return (
    <p className='flex justify-between text-sm mb-2'>
      <span>{label}</span>
      <span>{formatCurrency(amount)}</span>
    </p>
  );
}

export default BookingForm;
