import { ArrowUpRight, ArrowDownLeft, Wallet } from "lucide-react";
import {
  ShimmerForTransaction,
  ShimmmerForWallet,
} from "../components/Shimmer";
import {
  useAccountBalance,
  useTransations,
  useUser,
} from "../services/queries";
import { useNavigate } from "react-router-dom";
import UserDetail from "../components/User";
import ErrorPage from "./ErrorPage";
// import { useContext } from "react";
// import { ThemeContext } from "../context/ThemeContext";
// import Error from "../components/Error";

export default function Dashboard() {
  // const { setTheme, theme } = useContext(ThemeContext);
  // { label: 'Income', value: '+₹1,200.00', icon: ArrowDownLeft, color: 'bg-green-500' },
  // { label: 'Spent', value: '-₹459.50', icon: ArrowUpRight, color: 'bg-red-500' },
  // { label: 'Investments', value: '₹3,459.50', icon: TrendingUp, color: 'bg-purple-500' },
  const navigate = useNavigate();
  // const [isLoading, setLoading] = useState(false);
  const { data: transactions } = useTransations(1);
  // const [isError, setError] = useState({ isError: false, error: "" });
  console.log("reached userUser", localStorage.getItem("token"));
  const {
    data: userData,
    error: userError,
    isLoading: isUserLoading,
  } = useUser();
  const {
    data: accountData,
    isLoading,
    error: balanceError,
  } = useAccountBalance();

  const stats = [
    {
      label: "Balance",
      value: `₹${accountData?.data?.account.balance}`,
      icon: Wallet,
      color: "bg-blue-500",
    },
  ];

  if (balanceError || userError) {
    return <ErrorPage message="Cant fetch your dashboard details"/>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="md:text-5xl text-xl  font-bold dark:text-gray-200 uppercase line-clamp-2 font-['Giest']">
          Dashboard
        </h1>

        <div className="flex items-center gap-x-2">
          <button
            onClick={() => navigate("/send")}
            className="md:px-4 md:py-2 text-xs px-1 py-1 text-white bg-indigo-600 rounded-lg dark:hover:bg-indigo-500 transition-colors"
          >
            Send Money
          </button>
        </div>
      </div>
      <UserDetail />

      {/* Stats Grid */}
      {!isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-rich_blue-600 dark:bg-rich_black-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-none "
            >
              <div className="flex items-center justify-between *:dark:text-platinum-700">
                <div>
                  <p className="text-sm text-stone-100 dark:text-platinum-700 uppercase">
                    {stat.label}
                  </p>
                  <p className="font-semibold mt-1  text-secondary-50 text-4xl">
                    {!(isUserLoading || userError) ? stat.value : ""}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg ${stat.color} bg-stone-200 dark:bg-white`}
                >
                  <stat.icon className="w-6 h-6 text-rich_blue-600 " />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ShimmmerForWallet stats={stats} />
      )}

      {/* Recent Transactions */}
      <div
        className={`rounded-xl shadow-sm border border-gray-100  dark:shadow-sm   dark:border-none   dark:border-2 dark:border-rich_blue-600 ${
          isLoading ? "dark:bg-zinc-800" : "dark:bg-white/20"
        }`}
      >
        <div className="p-6 border-b dark:border-none border-gray-100 bg-rich_blue-100 dark:bg-rich_black-900 rounded-t-xl ">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white dark:text-2xl ">
            Recent Transactions
          </h2>
        </div>
        <div className="divide-y dark:divide-y-0  divide-gray-100 dark:divide-stone-100">
          {isLoading ? (
            <ShimmerForTransaction count={3} />
          ) : (
            <>
              {" "}
              {transactions?.data?.transations.length === 0 ? (
                <div className="border dark:border-none p-3 flex justify-center items-center h-40">
                  <p className="w-fit text-xl font-medium text-gray-500/50 ">
                    No recent transactions
                  </p>
                </div>
              ) : (
                transactions?.data?.transations
                  .slice(0, 3)
                  .map((transaction) => (
                    <div
                      key={transaction.id}
                      className="p-6 flex items-center justify-between hover:bg-gray-50 dark:bg-black/90"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-2 rounded-lg ${
                            transaction.senderId !== userData?.data?.user._id
                              ? "bg-green-100"
                              : "bg-red-100"
                          }`}
                        >
                          {transaction.senderId !== userData?.data?.user._id ? (
                            <ArrowDownLeft
                              className={`w-5 h-5 ${
                                transaction.senderId !==
                                userData?.data?.user._id
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            />
                          ) : (
                            <ArrowUpRight
                              className={`w-5 h-5 ${
                                transaction.senderId !==
                                userData?.data?.user._id
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-rich_black-900 dark:text-stone-200">
                            {transaction.senderId !== userData?.data?.user._id
                              ? transaction.senderName
                              : transaction.receiverName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(transaction.date).toLocaleDateString(
                              "en-GB"
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-medium ${
                            transaction.senderId !== userData?.data?.user._id
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.senderId !== userData?.data?.user._id
                            ? "+"
                            : "-"}
                          ₹{Math.abs(transaction.amount).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500 capitalize">
                          {transaction.status}
                        </p>
                      </div>
                    </div>
                  ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
