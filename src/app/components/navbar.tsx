import { IoHomeOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import Search from "./search";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("session");

    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <nav className="w-full h-[80px] overflow-hidden shadow-xs flex justify-between items-center p-5 px-[40px]">
      <Link href={"/companies"}>
        <IoHomeOutline className="text-[25px] text-[#646464]" />
      </Link>
      <div className="w-[600px] flex justify-between items-center gap-5">
        <Link
          className="w-[280px] flex items-center gap-1"
          href={"/create-company"}
        >
          <span className="font-semibold">Create Company</span>
          <IoIosAddCircleOutline className="text-[25px] text-[#646464]" />
        </Link>
        <Search />
        <IoLogOutOutline
          className="text-[50px] text-[#646464] cursor-pointer"
          onClick={handleLogout}
        />
      </div>
    </nav>
  );
};

export default NavBar;
