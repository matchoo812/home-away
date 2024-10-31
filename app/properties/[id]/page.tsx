import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { auth } from "@clerk/nextjs/server";
import { fetchPropertyDetails, findExistingReview } from "@/utils/actions";
import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import PropertyRating from "@/components/card/PropertyRating";
import Amenities from "@/components/properties/Amenities";
import Breadcrumbs from "@/components/properties/BreadCrumbs";
import Description from "@/components/properties/Description";
import ImageContainer from "@/components/properties/ImageContainer";
import PropertyDetails from "@/components/properties/PropertyDetails";
import ShareButton from "@/components/properties/ShareButton";
import UserInfo from "@/components/properties/UserInfo";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import SubmitReview from "@/components/reviews/SubmitReview";
import PropertyReview from "@/components/reviews/PropertyReview";

const DynamicMap = dynamic(() => import("@/components/properties/PropertyMap"), {
  ssr: false,
  loading: () => <Skeleton className='h-[400px] w-full' />,
});

const DynamicBookingWrapper = dynamic(
  () => import("@/components/booking/BookingWrapper"),
  { ssr: false, loading: () => <Skeleton className='h-[200px] w-full' /> }
);

async function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const property = await fetchPropertyDetails(id);

  if (!property) redirect("/");

  const {
    amenities,
    bedrooms,
    beds,
    baths,
    bookings,
    country,
    description,
    guests,
    image,
    name,
    price,
    tagline,
  } = property;
  const details = { baths, bedrooms, beds, guests };
  const { firstName, profileImage } = property.profile;
  const { userId } = auth();
  const isNotOwner = property.profile.clerkId !== userId;
  // check to ensure user is logged in, not the property owner, and has not already written a review
  const canAddReview =
    userId && isNotOwner && !(await findExistingReview(userId, property.id));

  return (
    <section>
      <Breadcrumbs name={name} />
      <header className='flex justify-between items-center mt-4'>
        <h1 className='text-4l font-bold capitalize'>{tagline}</h1>
        <div className='flex items-center gap-4'>
          <ShareButton name={name} propertyId={property.id} />
          <FavoriteToggleButton propertyId={property.id} />
        </div>
      </header>
      <ImageContainer mainImage={image} name={name} />
      <section className='lg:grid lg:grid-cols-12 gap-x-12 mt-12'>
        <div className='lg:col-span-8'>
          <div className='flex gap-4 items-center'>
            <h1 className='text-xl font-bold'>{name}</h1>
            <PropertyRating inPage propertyId={property.id} />
          </div>
          <PropertyDetails details={details} />
          <UserInfo profile={{ firstName, profileImage }} />
          <Separator className='mt-4' />
          <Description description={description} />
          <Amenities amenities={amenities} />
          <DynamicMap countryCode={country} />
        </div>
        <div className='lg:col-span-4 flex flex-col items-center'>
          {/* booking calendar */}
          <DynamicBookingWrapper
            propertyId={property.id}
            price={price}
            bookings={bookings}
          />
        </div>
      </section>
      {canAddReview && <SubmitReview propertyId={property.id} />}
      <PropertyReview propertyId={property.id} />
    </section>
  );
}
export default PropertyDetailsPage;
