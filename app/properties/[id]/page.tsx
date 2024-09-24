import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import Breadcrumbs from "@/components/properties/BreadCrumbs";
import ShareButton from "@/components/properties/ShareButton";
import { fetchPropertyDetails } from "@/utils/actions";
import { redirect } from "next/navigation";

async function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const property = await fetchPropertyDetails(id);

  if (!property) redirect("/");

  const { name, tagline, baths, bedrooms, beds, guests } = property;
  const details = { baths, bedrooms, beds, guests };
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
    </section>
  );
}
export default PropertyDetailsPage;
