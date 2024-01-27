import React, { useState } from "react";
import Avvvatars from "avvvatars-react";
import SendMoney from "./SendMoney";

const User = ({ user }) => {
  const { firstName, lastName, username } = user;
  const fullastNameame = firstName.charAt(0) + lastName?.charAt(0);
  const [showSetMoney, setShowSetMoney] = useState(false);

  return (
    <div className="relative">
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-x-2 items-center">
          <Avvvatars
            value={fullastNameame}
            style="character"
            size={50}
            shadow
          />
          <div className="text-lg font-bold">
            <span className="capitalize">{firstName}</span>{" "}
            <span className="capitalize">{lastName}</span>{" "}
            <span className="hidden md:flex lowercase text-sm font-extralight bg-gray-100 border border-slate-50">
              {username}
            </span>
          </div>
        </div>
        <div>
          <button
            className="w-full text-sm bg-black text-white py-3 px-2 md:px-4 rounded-md"
            onClick={() => setShowSetMoney(!showSetMoney)}
          >
            Send Money
          </button>
        </div>
      </div>
      {showSetMoney && (
        <div className="overlay">
          <div className="centered">
            <SendMoney user={user} setShowSetMoney={setShowSetMoney} />
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
