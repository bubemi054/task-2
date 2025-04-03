import { IoHomeOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import Search from "./search";
import Link from "next/link";

interface NavbarProps {
  clearSession: () => void;
  search: string;
  setSearch: (search: string) => void;
}

const NavBar = ({ clearSession, search, setSearch }: NavbarProps) => {
  return (
    <nav data-testid="navbar" role="navigation" className="w-full h-[80px] shadow-xs flex justify-between items-center p-4 md:px-10">
      {/* Home Icon */}
      <Link href={"/companies"}>
        <IoHomeOutline
          className="text-[25px] text-[#646464]"
          data-testid="home-icon"
        />
      </Link>

      {/* Center Section */}
      <div className="hidden md:flex w-[600px] justify-between items-center gap-5">
        <Link
          data-testid="create-company-link"
          className="w-[300px] flex items-center gap-1"
          href={"/create-or-edit-company"}
        >
          <span className="font-semibold hidden sm:inline">Create Company</span>
          <IoIosAddCircleOutline
            className="text-[25px] text-[#646464]"
            data-testid="create-company-icon"
          />
        </Link>
        <Search search={search} setSearch={setSearch} />
      </div>

      {/* Logout Icon */}
      <IoLogOutOutline
        className="text-[30px] sm:text-[40px] text-[#646464] cursor-pointer order-last sm:order-none"
        onClick={clearSession}
        data-testid="logout-icon"
      />

      {/* Mobile Menu - Hidden on larger screens */}
      <div className="md:hidden flex items-center gap-4">
        <Link href={"/create-or-edit-company"}>
          <IoIosAddCircleOutline
            className="text-[25px] text-[#646464]"
            data-testid="create-company-icon-mobile"
          />
        </Link>
        <Search search={search} setSearch={setSearch} />
      </div>
    </nav>
  );
};

export default NavBar;
