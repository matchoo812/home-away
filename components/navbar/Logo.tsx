import Link from "next/link";
// import { LuTent } from "react-icons/lu";
import { MdCabin } from "react-icons/md";
import { Button } from "../ui/button";

function Logo() {
  return (
    <Button size='icon' asChild>
      <Link href='/'>
        <MdCabin className='w-6 h-6' />
      </Link>
    </Button>
  );
}
export default Logo;
