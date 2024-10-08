import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { fetchPropertyDetails } from "@/utils/actions";
import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import PropertyRating from "@/components/card/PropertyRating";
import Amenities from "@/components/properties/Amenities";
import BookingCalendar from "@/components/properties/BookingCalendar";
import Breadcrumbs from "@/components/properties/BreadCrumbs";
import Description from "@/components/properties/Description";
import ImageContainer from "@/components/properties/ImageContainer";
import PropertyDetails from "@/components/properties/PropertyDetails";
import ShareButton from "@/components/properties/ShareButton";
import UserInfo from "@/components/properties/UserInfo";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const DynamicMap = dynamic(() => import("@/components/properties/PropertyMap"), {
  ssr: false,
  loading: () => <Skeleton className='h-[400px] w-full' />,
});

async function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const property = await fetchPropertyDetails(id);

  if (!property) redirect("/");

  const {
    amenities,
    bedrooms,
    beds,
    baths,
    country,
    description,
    guests,
    image,
    name,
    tagline,
  } = property;
  const details = { baths, bedrooms, beds, guests };
  const { firstName, profileImage } = property.profile;

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
          <BookingCalendar />
        </div>
      </section>
    </section>
  );
}
export default PropertyDetailsPage;
