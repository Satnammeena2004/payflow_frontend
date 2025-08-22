import { NavLink } from "react-router-dom";
import { MenuItems } from "../types";
import { useToggleMenu } from "../context/ToggleMenuContext";

export default function SingleLink({ item }: { item: MenuItems }) {
  const { setIsMobileMenuOpen } = useToggleMenu();
  return (
    <NavLink
      key={item.path}
      to={item.path}
      onClick={() => setIsMobileMenuOpen?.(false)}
      className={({ isActive }) =>
        `flex text-sm indent-1 items-center px-4 py-3 dark:text-stone-200 text-rich_blue-700 rounded-lg hover:text-indigo-600 dark:hover:text-indigo-600 ${
          isActive && "bg-rich_blue-600  !text-stone-50 hover:text-white"
        } transition-colors`
      }
    >
      <item.icon className="w-4  h-4 mr-1" />
      {item.label}
    </NavLink>
  );
}
