import React, { useEffect } from "react";
import axios from "axios";
import { searchAtom, usersAtom, isLoadingAtom } from "../store/userAtom";
import { useRecoilState, useSetRecoilState } from "recoil";

const SearchInput = () => {
  const [search, setSearch] = useRecoilState(searchAtom);
  const setUsers = useSetRecoilState(usersAtom);
  const setIsLoading = useSetRecoilState(isLoadingAtom);

  const findUsers = async (e) => {
    try {
      setIsLoading(true);
      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      const url = `${baseUrl}/user/bulk?filter=${search}`;

      const { data } = await axios.get(url, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });

      setUsers(data);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    findUsers();
  }, [search]);
  return (
    <div>
      <input
        type="text"
        placeholder="Search users.."
        id="search"
        value={search}
        className="py-2 px-4 border border-slate-300 w-full focus:outline-slate-300"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchInput;
