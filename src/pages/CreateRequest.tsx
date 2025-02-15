import { FormEvent, useMemo, useState } from "react";
import UserSearch from "../components/UserSearch";
import { CheckCircle2, Info, InfoIcon, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../services/fetcher";
import { CreateRequestType, User } from "../types";

const CreateRequest = () => {
  const [isLoading, setILoadig] = useState(false);
  const [selecetedReceiver, setSelectedReceiver] = useState<User | null>(null);
  const [formData, setFormData] = useState<CreateRequestType>({
    lender_id: "",
    amount: 0,
    request_type: "Borrow",
  });
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useMemo(() => {
    setFormData((form) => ({ ...form, lender_id: selecetedReceiver?._id }));
    setError("");
  }, [selecetedReceiver?._id]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selecetedReceiver?._id || formData.amount <= 0) {
      setError("Please fill required field !");
      return;
    }
    setError("");
    try {
      setILoadig(true);
      const data = await axiosInstance.post("/request", {
        lender_id: formData.lender_id,
        request_type: formData.request_type,
        amount: +formData.amount,
      });

      const json = data.data;
      if (!json.success) {
        setError(json.message);
        return;
      }
      setIsSuccess(true);
    } catch (error) {
      console.log("hererehehe", error);
      setError(
        error?.response?.data?.message ??
          "Something went wrong,Please try again"
      );
    } finally {
      setILoadig(false);
    }
  }
  return (
    <div className="flex relative ">
      <fieldset className="mx-auto my-10 sm:-translate-x-12 border-2 p-10 rounded-lg shadow-sm dark:bg-rich_black-800 dark:border-none">
        <legend className="uppercase text-gray-800 dark:text-stone-200 -translate-y-7 -translate-x-8 dark:text-2xl">
          Create Request
        </legend>
        {!isSuccess && (
          <>
            {error && (
              <p className="p-2 text-sm items-center bg-red-600/90 rounded-md -translate-y-6 flex gap-x-1 text-gray-200">
                {" "}
                <Info /> <span>{error}</span>
              </p>
            )}
            <div className="flex flex-col sm:w-full w-[68vw]">
              <div className="h-12 relative">
                <UserSearch
                  selecetedReceiver={selecetedReceiver}
                  setSelectedReceiver={setSelectedReceiver}
                />
                <span
                  className={`absolute -right-8 top-2 before:w-60 before:p-2 before:rounded-md dark:before:bg-black before:bg-stone-100 before:text-black   dark:before:text-white before:border before:hidden   hover:before:inline-block before:content-['You_can_only_send_3_request_per_user_before_previous_request_are_not_settled'] before:absolute before:top-4 before:-left-60 sm:before:top-10 md:before:-left-10 lg:before:-left-0 before:z-10`}
                >
                  <InfoIcon className="dark:text-white/60" />
                </span>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
                <div className="my-3 flex gap-x-2">
                  <label
                    htmlFor="request_type"
                    className="text-gray-700 dark:text-stone-200"
                  >
                    <span className="text-red-500 ">*</span>Request Type
                  </label>
                  <select
                    id="amount"
                    name="request_type"
                    className="p-2 border rounded-lg w-fit dark-input text-sm "
                    value={formData.request_type}
                    onChange={(e) =>
                      setFormData((form: CreateRequestType) => ({
                        ...form,
                        request_type: e.target.value as "Due" | "Borrow",
                      }))
                    }
                  >
                    <option className="text-xs" value="select">
                      Select
                    </option>
                    <option className="text-xs" value="borrow">
                      Borrow
                    </option>
                    <option className="text-xs" value="due">
                      Due
                    </option>
                    {/* <option value="Split">Split</option> */}
                  </select>
                </div>
                <div className="flex gap-x-2">
                  <label
                    htmlFor="amount"
                    className="text-gray-600 dark:text-stone-200"
                  >
                    <span className="text-red-500">*</span>Amount
                  </label>
                  <input
                    disabled={isLoading}
                    name="amount"
                    id="amount"
                    max={10000}
                    maxLength={5}
                    className="p-3 rounded-lg border ml-14 sm:w-fit w-20 dark-input"
                    value={formData.amount}
                    type="number"
                    onChange={(e) => {
                      if (Number(e.target.value) > 10000) {
                        setError("Amount should not exceed 10,000");
                      } else {
                        setError("");
                        setFormData((form: CreateRequestType) => ({
                          ...form,
                          amount: Number.parseInt(e.target.value),
                        }));
                      }
                    }}
                  />
                </div>
                <button
                  className="px-3 flex justify-center items-center gap-x-1 py-2 rounded-md bg-blue-600 hover:bg-blue-500 dark:bg-rich_blue-600 dark:text-stone-200"
                  type="submit"
                  //   disabled={!selecetedReceiver?._id || formData.amount <= 0}
                >
                  {isLoading && <Loader2 className="animate-spin" />}{" "}
                  <span>Submit</span>
                </button>
              </form>
            </div>
          </>
        )}
        {isSuccess && (
          <>
            <div className="mb-6 p-4 bg-blue-500 dark:bg-rich_blue-600 rounded-lg flex items-center text-stone-100">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              {formData.request_type} Request Sent successfully to @
              {selecetedReceiver?.name}
            </div>
            <Link to={"/dashboard"} className="text-sm underline text-blue-500">
              Go to dashboard
            </Link>
          </>
        )}
      </fieldset>
    </div>
  );
};

export default CreateRequest;
