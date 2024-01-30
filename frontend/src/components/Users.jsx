import React from "react";
import { useRecoilValue } from "recoil";
import { isLoadingAtom, usersAtom } from "../store/userAtom";
import User from "./User";
import { ScaleLoader } from "react-spinners";

const Users = () => {
  const users = useRecoilValue(usersAtom);
  const isLoading = useRecoilValue(isLoadingAtom);

  return (
    <div className="mt-10 flex flex-col gap-y-7">
      {isLoading ? (
        <ScaleLoader color="black" className="flex justify-center" />
      ) : (
        <div className="mt-10 flex flex-col gap-y-7">
          {users.map((user) => {
            return <User user={user} key={user.username} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Users;
