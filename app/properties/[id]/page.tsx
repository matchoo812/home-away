import { redirect } from "next/navigation";
import { fetchPropertyDetails } from "@/utils/actions";
import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import PropertyRating from "@/components/card/PropertyRating";
import Breadcrumbs from "@/components/properties/BreadCrumbs";
import ImageContainer from "@/components/properties/ImageContainer";
import ShareButton from "@/components/properties/ShareButton";
import BookingCalendar from "@/components/properties/BookingCalendar";
import PropertyDetails from "@/components/properties/PropertyDetails";
import UserInfo from "@/components/properties/UserInfo";

async function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const property = await fetchPropertyDetails(id);

  if (!property) redirect("/");

  const { name, tagline, baths, bedrooms, beds, guests, image } = property;
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
        </div>
        <div className='lg:col-span-4 flex flex-col items-center'>
          <BookingCalendar />
        </div>
      </section>
    </section>
  );
}
export default PropertyDetailsPage;
