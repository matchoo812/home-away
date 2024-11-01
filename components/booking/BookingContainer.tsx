import { useProperty } from "@/utils/store";
import ConfirmBooking from "./ConfirmBooking";
import BookingForm from "./BookingForm";

function BookingContainer() {
  const { range } = useProperty((state) => state);
  console.log(Math.abs(range?.to - range?.from));

  if (!range || !range.from || !range.to) return null;
  if (range.from === range.to) return null;

  return (
    <div className='w-full'>
      <BookingForm />
      <ConfirmBooking />
    </div>
  );
}
export default BookingContainer;
