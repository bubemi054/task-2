import { CiSearch } from "react-icons/ci";

interface SearchProps {
  search: string;
  setSearch: (value: string) => void;
}

const Search = ({ search, setSearch }: SearchProps) => {
  return (
    <form className="w-full flex justify-between items-center px-3 rounded-[5px] border-[0.3px] border-[#646464]">
      <input
        data-testid="search-input"
        className="w-[90%] p-2 border-none outline-none"
        type="text"
        placeholder="Search Company"
        onChange={(e) => setSearch(e.target.value)}
        value={search || ""}
      />
      <CiSearch role="search-icon" className="text-[20px] text-[gray]" />
    </form>
  );
};

export default Search;
