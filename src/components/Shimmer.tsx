export const ShimmmerForWallet = ({ stats }: { stats: unknown[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((_: unknown, index: number) => (
        <div
          key={index}
          className="bg-slate-200 dark:bg-black/80 p-6 rounded-xl animate-pulse shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 "></p>
              <p className="text-2xl font-semibold mt-1 h-10 w-40"></p>
            </div>
            <div className={``}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ShimmerForTransaction = ({ count }) => {
  return [...Array(count)].map((_, index) => {
    return (
      <div
        key={index}
        className="bg-slate-200 dark:bg-black/80 p-10 rounded-xl animate-pulse w-[99%] my-3 mx-auto   flex items-center justify-between "
      ></div>
    );
  });
};

export const GetShimmer = ({
  count,
  children: C,
}: {
  count: number;
  children: React.FC;
}): JSX.Element[] => {
  return [...Array(count)].map((_, index) => <C key={index} />);
};

export function TableRowShimmer() {
  return (
    <tr
      key="shimmer"
      className=" hover:bg-gray-50 dark:bg-black/90 dark:*:text-stone-200 *:animate-pulse"
    >
      <td className="px-6 py-4 whitespace-nowrap ">
        <div className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 w-10 h-10"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
      </td>
    </tr>
  );
}

export const ProfileShimmer = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden animate-pulse">
      <div className="p-8">
        <div className="flex items-center space-x-6 mb-8">
          <div className="relative">
            {/* Profile Picture Shimmer */}
            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            {/* Icon Shimmer */}
            <div className="absolute bottom-0 right-0 p-2 bg-gray-300 dark:bg-gray-600 rounded-full w-8 h-8"></div>
          </div>
          <div className="space-y-2">
            {/* Name Shimmer */}
            <div className="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
            {/* Role Shimmer */}
            <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Full Name Field Shimmer */}
            <div>
              <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            </div>

            {/* Email Address Field Shimmer */}
            <div>
              <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            </div>

            {/* Phone Number Field Shimmer */}
            <div>
              <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            </div>
          </div>

          {/* Buttons Shimmer */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="w-24 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="w-24 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
