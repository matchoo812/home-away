"use client";

import { useAuth, SignInButton } from "@clerk/nextjs";
import { useProperty } from "@/utils/store";
import { createBookingAction } from "@/utils/actions";
import { Button } from "../ui/button";
import { SubmitButton } from "../form/Buttons";
import FormContainer from "../form/FormContainer";

function ConfirmBooking() {
  const { userId } = useAuth();
  const { propertyId, range } = useProperty((state) => state);
  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;

  if (!userId) {
    return (
      <SignInButton mode='modal'>
        <Button type='button' className='w-full'>
          Sign In to Complete Booking
        </Button>
      </SignInButton>
    );
  }

  const createBooking = createBookingAction.bind(null, {
    propertyId,
    checkIn,
    checkOut,
  });

  return (
    <section>
      <FormContainer action={createBooking}>
        <SubmitButton text='Reserve' className='w-full' />
      </FormContainer>
    </section>
  );
}
export default ConfirmBooking;
