export type actionFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string }>;

type TextAreaInputProps = {
  name: string;
  labelText?: string;
  defaultValue?: string;
};

export type PropertyCardProps = {
  image: string;
  id: string;
  name: string;
  tagline: string;
  country: string;
  price: number;
};
