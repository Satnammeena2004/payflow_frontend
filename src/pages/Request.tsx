import { Dispatch, SetStateAction, useState } from "react";
import { useUser } from "../services/queries";
import ErrorPage from "./ErrorPage";
import { Filter, HandCoins, Info, Search } from "lucide-react";
import { GetShimmer, TableRowShimmer } from "../components/Shimmer";
import { SWRResponse } from "swr";
import { FetchResponse, RequestType, RequestTypeForRequest } from "../types";

import { axiosInstance } from "../services/fetcher";
import ConfirmationModal from "../components/Modal";
import Paggination from "../components/Paggination";

const Request = ({
  response,
  type,
  currentPage,
  setCurrentPage,
}: {
  response: SWRResponse<FetchResponse<{ requests: RequestType[],count:number }>>;
  type: "Sent" | "Received"; // "sent" or "received"
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [modal, setModal] = useState(false);
  const user = useUser();
  const [error, setError] = useState("");
  const [requestId, setRequestId] = useState("");
  const { data, isLoading } = response;
  const [requestType, setRequestType] = useState<RequestTypeForRequest>({
    type: "",
    sender_account_id: "",
    receiver_account_id: "",
    amount: "",
    request_type: "",
  });
  if (user.error) {
    return <ErrorPage message={`Cant't fetch your ${type} Requests`} />;
  }

  const filteredTransactions = data?.data?.requests?.filter((request) => {
    const matchesSearch =
      request.lender_id.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.amount
        .toString()
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.requester_id.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || request.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  function handleClick(id: string) {
    setModal(true);
    setRequestId(id);
  }
  async function handleReject(id: string) {
    if (id === "") {
      return;
    }
    try {
      const { data } = await axiosInstance.patch<FetchResponse<null>>(
        "/request/reject/" + id
      );
      if (data.success) {
        response.mutate();
        setModal(false);

        return;
      }
      setError("Failed to reject request");
    } catch (error) {
      console.error(error);
      setError("Failed to reject request");
    } finally {
      setRequestId("");
    }
  }
  async function handleApproved(id: string) {
    if (id === "") {
      return;
    }
    try {
      const { data } = await axiosInstance.patch<FetchResponse<null>>(
        "/request/approve/" + id,
        {
          amount: +requestType.amount,
          sender_account_id: requestType.sender_account_id,
          receiver_account_id: requestType.receiver_account_id,
          type: "regular",
        }
      );
      if (data.success) {
        response.mutate();
        setModal(false);

        return;
      }
      setError("Failed to approved request");
    } catch (error) {
      console.error(error);
      setError("Failed to approved request");
    } finally {
      setRequestId("");
    }
  }

  function onClose() {
    setRequestId("");
    setModal(false);
  }

  return (
    <div>
      <ConfirmationModal
        isOpen={modal}
        onClose={onClose}
        onConfirm={() =>
          requestType.type === "reject"
            ? handleReject(requestId)
            : handleApproved(requestId)
        }
      />
      <div className="flex-col flex md:flex-row items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-stone-200">
          {type} Requests
        </h1>
        <div className="flex sm:space-x-4 sm:flex-row gap-y-1 flex-col">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark-input"
              placeholder="Search transactions..."
            />
          </div>
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="block w-40 pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 appearance-none dark-input"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 dark:border-none">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-black overflow-hidden">
            <thead>
              <tr className="bg-gray-50 dark:bg-black/90 dark:*:text-stone-100 dark:rounded-md">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completed Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-y-0 divide-gray-200">
              {filteredTransactions?.length === 0 ? (
                <div className="flex justify-center items-center">
                  <h1 className=" p-3 text-center dark:text-gray-800 ">
                    *No {type} Requests
                  </h1>
                </div>
              ) : (
                ""
              )}

              {!isLoading ? (
                filteredTransactions?.map((request) => (
                  <tr
                    key={Math.random() * 10000}
                    className="hover:bg-gray-50 dark:bg-black/90 dark:*:text-stone-300"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`p-2 rounded-lg inline-flex ${
                          request.request_type === "borrow"
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        {request.request_type === "borrow" ? (
                          <>
                            {" "}
                            <HandCoins className="w-5 h-5 text-green-600 mx-2" />
                            <span className="dark:text-black">Borrow</span>
                          </>
                        ) : (
                          <>
                            {" "}
                            <Info className="w-5 h-5 text-red-600 mx-2" />
                            <span className="dark:text-black">Due</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`font-medium
                             ${
                               ""
                               //   request.request_type === "borrow"
                               //     ? "text-green-600"
                               //     : "text-red-600"
                             }
                        
                        `}
                      >
                        {/* {request.request_type === "borrow" ? "+" : "-"}/ */}
                        ₹{request.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900 dark:text-stone-100">
                        {type === "Sent"
                          ? request.lender_id.name
                          : request.requester_id.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {/* {new Date(transaction.date).toLocaleDateString()} */}
                      {new Date(request.request_date).toLocaleDateString(
                        "en-GB"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {request.completed_date
                        ? new Date(request.completed_date).toLocaleDateString(
                            "en-GB"
                          )
                        : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-x-1">
                        <span
                          className={`px-2 mr-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            request.status === "approved"
                              ? "bg-green-100 text-green-800 dark:bg-green-600 dark:text-white"
                              : request.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {request.status}
                        </span>
                        {type === "Received" && (
                          <>
                            {!["approved", "rejected"].includes(
                              request.status
                            ) && (
                              <div className="flex gap-x-1">
                                <button
                                  className="text-sm p-1 px-2 bg-green-500 text-white/95 rounded-md"
                                  onClick={() => {
                                    setRequestType(
                                      (pre: RequestTypeForRequest) => ({
                                        ...pre,
                                        receiver_account_id:
                                          request.requester_id.account_id,
                                        sender_account_id:
                                          user.data?.data?.user.account_id._id,
                                        amount: request.amount,
                                        request_type: request.request_type,
                                      })
                                    );
                                    handleClick(request._id);
                                  }}
                                >
                                  Approve
                                </button>
                                <button
                                  className="text-sm p-1 px-2 text-stone-50 bg-red-500 rounded-md"
                                  onClick={() => {
                                    setRequestType("reject");
                                    handleClick(request._id);
                                  }}
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  <GetShimmer count={3} children={TableRowShimmer} />
                </>
              )}
            </tbody>
          </table>
        </div>
        <Paggination
          totalItems={data?.data?.count}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Request;
