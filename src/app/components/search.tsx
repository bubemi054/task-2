import { CiSearch } from "react-icons/ci";
import { useSearch } from "../hooks/useSearch";

const Search = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <form className="w-full flex justify-between items-center px-3 rounded-[5px] border-[0.3px] border-[#646464]">
      <input
        className="w-[90%] p-2 border-none outline-none"
        type="text"
        placeholder="Search Company"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <CiSearch className="text-[20px] text-[gray]" />
    </form>
  );
};

export default Search;
