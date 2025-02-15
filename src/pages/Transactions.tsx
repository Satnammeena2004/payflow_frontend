import { useState } from "react";
import { ArrowUpRight, ArrowDownLeft, Search, Filter } from "lucide-react";
import { useTransations, useUser } from "../services/queries";
import { GetShimmer, TableRowShimmer } from "../components/Shimmer";
import ErrorPage from "./ErrorPage";
import Paggination from "../components/Paggination";

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const user = useUser();
  const { data, isLoading } = useTransations(currentPage);
  if (user.error) {
    return <ErrorPage message="Can't fetch your transations" />;
  }

  const filteredTransactions = data?.data?.transations.filter((transaction) => {
    const matchesSearch =
      transaction.receiverName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.amount
        .toString()
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.notes?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || transaction.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  console.log("file filteredTransactions", filteredTransactions);

  return (
    <div className="">
      <div className="flex-col flex md:flex-row items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-stone-200">
          Transaction History
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
              <option value="success">success</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 dark:border-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-black ">
            <thead>
              <tr className="bg-gray-50 dark:bg-black/90 dark:*:text-stone-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  From/To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-y-0">
              {!isLoading ? (
                filteredTransactions?.map((transaction) => (
                  <tr
                    key={Math.random() * 10000}
                    className="hover:bg-gray-50 dark:bg-black/90 dark:*:text-stone-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`p-2 rounded-lg inline-flex dark:bg-rich_black-900 ${
                          transaction.senderId !== user.data?.data?.user._id
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        {transaction.senderId !== user.data?.data?.user._id ? (
                          <ArrowDownLeft className="w-5 h-5 text-green-600 " />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`font-medium ${
                          transaction.senderId !== user.data?.data?.user._id
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.senderId !== user.data?.data?.user._id
                          ? "+"
                          : "-"}
                        ₹{transaction.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap dark:*:text-stone-200">
                      <span className="text-gray-900 ">
                        {transaction.senderId !== user.data?.data?.user._id
                          ? transaction.senderName
                          : transaction.receiverName}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {/* {new Date(transaction.date).toLocaleDateString()} */}
                      {new Date(transaction.date).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.status === "success"
                            ? "bg-green-100 text-green-800 dark:bg-green-600 dark:text-white"
                            : transaction.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {transaction.notes}
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
}
