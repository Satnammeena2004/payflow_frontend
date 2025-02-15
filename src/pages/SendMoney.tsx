import React, {
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useBulkUserByFilter, useUser } from "../services/queries";
import { User } from "../types";
import UserSearch from "../components/UserSearch";
import { axiosInstance } from "../services/fetcher";

export const SearchUsers = memo(
  ({
    recipient,
    setRecipient,
  }: {
    recipient: string;
    setRecipient: Dispatch<SetStateAction<User | null>>;
  }) => {
    const { data } = useBulkUserByFilter(recipient);

    function handleSelectUser(user: User) {
      setRecipient(() => ({ ...user }));
    }
    return (
      <div className="absolute top-12 w-full z-10 bg-stone-50 p-2 rounded-sm dark:bg-rich_black-900 dark:text-gray-200">
        {data?.data?.users.length === 0 ? (
          <p>No result for "{recipient}"</p>
        ) : (
          data?.data?.users.map((user) => (
            <div
              key={user._id}
              onClick={() => handleSelectUser(user)}
              className="cursor-pointer w-full flex justify-between items-center hover:bg-slate-200  rounded-xl p-1 px-3 dark:hover:bg-rich_black-700"
            >
              <div className="flex justify-center gap-x-1 items-center">
                <img
                  className="w-8 h-8 rounded-full"
                  src={user.profilePicture}
                />
                <span className="text-sm dark:text-stone-100">{user.name}</span>
              </div>
              <p className="text-sm text-gray-400 hidden sm:block">
                {user.email}
              </p>
            </div>
          ))
        )}
        {/* <div>
        <h1>Recents</h1>
        {data.users.slice(2).map((user) => (
          <div
            key={user._id}
            onClick={(e) => handleSelectUser(user)}
            className="cursor-pointer w-full flex justify-between items-center hover:bg-slate-200  rounded-xl p-1 px-3"
          >
            <div className="flex justify-center gap-x-1 items-center">
              <img className="w-8 h-8 rounded-full" src={user.profilePicture} />
              <span className="text-sm">{user.name}</span>
            </div>
            <p className="text-sm">{user.email}</p>
          </div>
        ))}
      </div> */}
      </div>
    );
  }
);

export default function SendMoney() {
  const [step, setStep] = useState(1);
  const [selecetedReceiver, setSelectedReceiver] = useState<User | null>(null);
  const { data } = useUser();
  // const {mutate} = useTransations()
  const [formData, setFormData] = useState<{
    recipient: string;
    amount: string;
    note: string;
  }>({
    recipient: "",
    amount: "",
    note: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  // const [focus, setFocus] = useState(false);
  const [setRealFilter] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!selecetedReceiver) {
        setError("Please select a recipient");
        return;
      }
      if (!formData.amount) {
        setError("Please enter a valid amount");
        return;
      }
      setError("");
      setStep(2);
    } else {
      // Add send money logic here
      const res = await axiosInstance.post("/account/transfer", {
        amount: +formData.amount,
        sender_account_id: data?.data?.user.account_id._id,
        receiver_account_id: selecetedReceiver?.account_id,
        notes: formData.note,
        type: "regular",
      });
      const json = res.data;
      if (!json.success) {
        setError("Failed to transfer money");
      } else {
        setIsSuccess(true);
        setError("");
      }
    }
  };

  // function handleChange(e: ChangeEvent<HTMLInputElement>) {
  //   setFormData({ ...formData, recipient: e.target.value });
  // }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.recipient || formData.recipient.length > 1) {
        setRealFilter(formData.recipient);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [formData.recipient, setRealFilter]);

  return (
    <div className="max-w-2xl mx-auto ">
      <h1 className="text-2xl font-bold text-gray-900 mb-8 dark:text-white">
        Send Money
      </h1>
      <div className="bg-white dark:bg-rich_black-900 rounded-xl shadow-sm border dark:border-none dark:outline-4 dark:outline-neutral-50 border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              1
            </div>
            <div className="flex-1 h-0.5 bg-gray-200">
              <div
                className={`h-0.5 ${
                  step >= 2 ? "bg-indigo-600" : "bg-gray-200"
                }`}
                style={{ width: step >= 2 ? "100%" : "0%" }}
              />
            </div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              2
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-center text-red-800">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}
          {isSuccess && (
            <div className="mb-6 p-4 bg-blue-500 dark:bg-rich_blue-600 rounded-lg flex items-center text-stone-100">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Money transfer successfully
            </div>
          )}
          {!isSuccess ? (
            <>
              {step === 1 ? (
                <div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-stone-200">
                      Recipient
                    </label>
                    <>
                      <UserSearch
                        selecetedReceiver={selecetedReceiver}
                        setSelectedReceiver={setSelectedReceiver}
                      />
                    </>
                  </div>
                  <br />
                  <br />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-stone-200">
                      Amount
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 dark:text-white">₹</span>
                      </div>
                      <input
                        type="number"
                        value={formData.amount}
                        onChange={(e) => {
                          if (
                            +e.target.value >
                            (data?.data?.user?.account_id?.balance !== undefined
                              ? data?.data?.user?.account_id?.balance
                              : 0)
                          ) {
                            setError("Insufficient funds");
                          } else {
                            setError("");
                          }
                          setFormData({
                            ...formData,
                            amount: e.target.value,
                          });
                        }}
                        className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark-input"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <br />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-stone-200">
                      Note (optional)
                    </label>

                    <textarea
                      value={formData.note}
                      onChange={(e) =>
                        setFormData({ ...formData, note: e.target.value })
                      }
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark-input"
                      rows={3}
                      placeholder="Add a note..."
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6 ">
                  <div className="bg-gray-50 rounded-lg p-6 dark:bg-rich_black-800">
                    <h3 className="text-lg font-medium text-gray-900 mb-4 dark:text-stone-100">
                      Confirm Details
                    </h3>
                    <dl className="space-y-4">
                      <div className="flex justify-between">
                        <dt className="text-sm text-gray-500 dark:text-stone-200">
                          Recipient
                        </dt>
                        <dd className="text-sm font-medium text-gray-900 dark:text-stone-200">
                          {selecetedReceiver?.name}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-gray-500 dark:text-stone-200">
                          Amount
                        </dt>
                        <dd className="text-sm font-medium text-gray-900 dark:text-stone-200">
                          ₹{formData.amount}
                        </dd>
                      </div>
                      {formData.note && (
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-500 dark:text-stone-200">
                            Note
                          </dt>
                          <dd className="text-sm font-medium text-gray-900 dark:text-stone-200">
                            {formData.note}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-between">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setError("");
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Back
                  </button>
                )}
                {!error && (
                  <button
                    type="submit"
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 ml-auto"
                  >
                    {step === 1 ? "Continue" : "Send Money"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                )}
              </div>
            </>
          ) : (
            <div>
              <Link
                className="underline hover:text-blue-600 dark:text-stone-300  font-medium"
                to={"/dashboard"}
              >
                Go to dashboard
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
