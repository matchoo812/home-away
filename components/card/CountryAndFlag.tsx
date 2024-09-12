import { findCountryByCode } from "@/utils/countries";

function CountryAndFlag({ countryCode }: { countryCode: string }) {
  const validCountry = findCountryByCode(countryCode);
  const countryName =
    validCountry?.name.length > 20
      ? `${validCountry?.name.subString(0, 20)}...`
      : validCountry.name;

  return (
    <span className='flex justify-between items-center gap-2 text-sm'>
      {validCountry.flag} {countryName}
    </span>
  );
}
export default CountryAndFlag;
