import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { SubmitButton } from "@/components/form/Buttons";

const createProfileAction = async (prevState: any, formData: FormData) => {
  "use server";
  const firstName = formData.get("firstName") as string;
  console.log(firstName);
  return { message: "Profile created" };
};

function CreateProfilePage() {
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>New User</h1>
      <div className='border p-8 rounded-md '>
        <FormContainer action={createProfileAction}>
          <div className='grid md:grid-cols-2 gap-4 mt-4'>
            <FormInput name='firstName' type='text' label='First Name' />
            <FormInput name='lastName' type='text' label='Last Name' />
            <FormInput name='username' type='text' label='Username' />
          </div>
          <SubmitButton text='Create Profile' className='mt-8' />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateProfilePage;
