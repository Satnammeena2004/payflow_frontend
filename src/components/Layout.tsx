import { Outlet } from "react-router-dom";
import {
  Home,
  Send,
  History,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  ArrowDownUp,
  MoveDownLeft,
  MoveUpRight,
  Edit,
  LucideGhost,
} from "lucide-react";
import { useContext, useState } from "react";
import { useAuth } from "../context/Auth_Context";
import { useOnline } from "../hooks/useOnline";
import ErrorPage from "../pages/ErrorPage";
import { MenuItems } from "../types";
import LinkGenerator from "./Links";
import { ThemeContext } from "../context/ThemeContext";

const menuItems: MenuItems[] = [
  {
    icon: Home,
    label: "Dashboard",
    path: "/dashboard",
  },
  { icon: Send, label: "Send Money", path: "/send" },
  { icon: History, label: "Transactions", path: "/transactions" },
  { icon: Edit, label: "Create Request", path: "/create-request" },
  {
    icon: ArrowDownUp,
    label: "Requests",
    path: "/requests",
    children: [
      { icon: MoveUpRight, label: "Sent", path: "/sent-requests" },
      { icon: MoveDownLeft, label: "Received", path: "/received-requests" },
    ],
  },
  { icon: UserIcon, label: "Profile", path: "/profile" },
];

export default function Layout() {
  const { theme: t, setTheme } = useContext(ThemeContext);
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  const isOnline = useOnline();

  const handleLogout = async () => {
    logout();
  };

  return (
    <div className={`min-h-screen  font-satoshi ${theme} `}>
      {/* Desktop Sidebar */}
      <aside className="fixed hidden lg:flex flex-col w-64 h-screen border-r dark:border-none     dark:shadow-silver_lake_blue-800  bg-rich_blue-100 dark:bg-black/90">
        <div className="p-6 ">
          <h1 className="dark:text-4xl text-4xl font-bold text-rich_blue-600">
            PayFlow
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 *:text-platinum-700 ">
          <LinkGenerator menuItems={menuItems} />
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-gray-700 dark:text-stone-100 rounded-lg hover:bg-red-50 hover:text-red-600 dark:hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed w-full bg-white border-b border-gray-200 z-10 dark:border-none dark:bg-black">
        <div className="flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-indigo-600">PayFlow</h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 dark:text-white" />
            ) : (
              <Menu className="w-6 h-6 dark:text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="px-4 py-2 pb-4 space-y-2 ">
            {/* {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 ${
                    isActive && "bg-blue-200"
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </NavLink>
            ))} */}
            <LinkGenerator menuItems={menuItems} />
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </nav>
        )}
      </div>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0   dark:bg-rich_black-950 relative ">
        <button
          className={`scale-90 z-10 fixed right-0 top-0 w-8 h-8 bg-rich_black-900 flex justify-center items-center rounded-full $`}
        >
          <LucideGhost
            className={"text-white"}
            onClick={() =>
              setTheme((pre: string) => (pre === "dark" ? "light" : "dark"))
            }
          />
        </button>
        <div className="p-6">
          {isOnline ? (
            <Outlet />
          ) : (
            <ErrorPage message="Please check your internet connection" />
          )}
        </div>
      </main>
    </div>
  );
}
