import { MenuItems } from "../types";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SingleLink from "./SingleLink";


function ParentLInk({ item }: { item: MenuItems }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <button
        className="flex justify-between w-full rounded-lg  px-4 py-3   transition-colors"
        onClick={() => setShow(!show)}
      >
        <span className="flex dark:text-stone-300 text-rich_blue-700">
          <item.icon className="w-5 h-5 mr-3" />
          {item.label}
        </span>
        {show ? <ChevronUp className="dark:text-stone-200" /> : <ChevronDown className="dark:text-stone-200" />}
      </button>
      {show && (
        <div className="pl-6 -translate-y-2">
          {item.children?.map((child) => (
            <SingleLink item={child} />
          ))}
        </div>
      )}
    </>
  );
}

export default function LinkGenerator({
  menuItems,
}: {
  menuItems: MenuItems[];
}) {
  return menuItems.map((item: MenuItems) =>
    item.children ? (
      <>
        <ParentLInk item={item} />
      </>
    ) : (
      <SingleLink item={item} />
    )
  );
}
