import { useAuth } from "../context/Auth_Context";

const ErrorPage = ({message="Oops! Something Went Wrong"}) => {
  const { logout } = useAuth();
  return (
    <div className="z-10  flex flex-col items-center justify-cente p-6 dark:bg-rich_black-950">
      {/* Error Illustration */}
      <div className="md:w-40 md:h-40 w-20 h-20 mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-full h-full text-red-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      </div>

      {/* Error Message */}
      <h1 className="md:text-4xl text-sm whitespace-nowrap font-bold text-gray-800 mb-4 dark:text-gray-200">
        {message}
      </h1>
      <p
        className="md:text-lg text-xs text-gray-600 mb-8 text-center dark:text-gray-400
      "
      >
        We apologize for the inconvenience. Please try again later or contact
        support if the issue persists.
      </p>

      {/* Call-to-Action Button */}
      <div className="flex gap-x-3 *:text-sm md:flex-row flex-col gap-y-2">
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white md:px-6 md:py-3 px-3 py-2 whitespace-nowrap rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Reload Page
        </button>
      
        <button
          onClick={() => {
            window.location.href = "/login";
            logout();
          }}
          className="bg-blue-500 md:px-6 md:py-3 px-3 py-2 whitespace-nowrap text-white  rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Try a  fresh
        </button>
      </div>
      {/* Support Link */}
      <p className="mt-8 text-gray-500">
        Need help?{" "}
        <a
          href="mailto:support@example.com"
          className="text-blue-500 hover:underline text-xs md:text-sm"
        >
          Contact Support
        </a>
      </p>
    </div>
  );
};

export default ErrorPage;
