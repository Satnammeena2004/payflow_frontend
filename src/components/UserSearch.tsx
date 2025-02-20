import { Delete, Search } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { SearchUsers } from "../pages/SendMoney";
// import { User } from "../types";

const UserSearch = ({selecetedReceiver, setSelectedReceiver}) => {
  // const [selecetedReceiver, setSelectedReceiver] = useState<User | null>(null);

  const [focus, setFocus] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [realFilter, setRealFilter] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      if (recipient || recipient.length > 1) {
        setRealFilter(recipient);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [recipient]);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setRecipient(e.target.value);
  }
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3  flex items-center ">
        {!selecetedReceiver && <Search className="h-5 w-5 text-gray-400" />}
        {selecetedReceiver && (
          <div className="relative  dark:bg-rich_blue-500 top-4 right-4 z-10 px-3 p-1 border rounded-md flex items-center gap-x-1 dark:border-none">
            <img
              className="w-8 h-8 rounded-full"
              src={selecetedReceiver.profilePicture}
            />
            <span className="mr-2 dark:text-slate-100">{selecetedReceiver.name}</span>{" "}
            <Delete
              className="space-y-6  text-red-500 dark:text-rich_black-800"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedReceiver(null);
              }}
            />{" "}
          </div>
        )}
      </div>
      {!selecetedReceiver && (
        <>
          <input
            type="text"
            value={recipient}
            onFocus={() => setFocus(true)}
            onChange={handleChange}
            onBlur={() => setTimeout(() => setFocus(false), 300)}
            className={`block w-full ${
              selecetedReceiver ? "pl-28" : "pl-10"
            } pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500  dark-input`}
            placeholder="Search by name,email, or phone"
          />
        </>
      )}
      {/* <Another filter={realFilter} /> */}
      {!selecetedReceiver && focus && (
        <SearchUsers
          recipient={realFilter}
          setRecipient={setSelectedReceiver}
        />
      )}
    </div>
  );
};

export default UserSearch;
