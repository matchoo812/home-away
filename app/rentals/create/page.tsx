import { createPropertyAction } from "@/utils/actions";
import FormInput from "@/components/form/FormInput";
import FormContainer from "@/components/form/FormContainer";
import { SubmitButton } from "@/components/form/Buttons";
import PriceInput from "@/components/form/PriceInput";
import CategoriesInput from "@/components/form/CategoriesInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import CountriesInput from "@/components/form/CountriesInput";
import ImageInput from "@/components/form/ImageInput";

function CreatePropertyPage() {
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>Create Property</h1>
      <div className='border p-8 rounded'>
        <h3 className='text-lg mb-4 font-medium'>General Info</h3>
        <FormContainer action={createPropertyAction}>
          <div className='grid md:grid-cols-2 gap-8 mb-4'>
            <FormInput
              name='name'
              type='text'
              label='Name (limit 20)'
              defaultValue='Cabin in USA'
            />
            <FormInput
              name='tagline'
              type='text'
              label='Tagline (limit 40)'
              defaultValue='Your Dream Getaway Awaits'
            />
            {/* price */}
            <PriceInput />
            {/* categories */}
            <CategoriesInput />
          </div>
          {/* text area - description input */}
          <TextAreaInput name='description' labelText='Property Description' />
          <div className='grid sm:grid-cols-2 gap-8'>
            <CountriesInput />
            <ImageInput />
          </div>
          <SubmitButton text='Create Rental' className='mt-12' />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreatePropertyPage;
