import { LucideInfo } from "lucide-react";

const Error = () => {
  return (
    <div
      className={`backdrop-blur-sm flex justify-center text-red-500 overflow-hidden  absolute  w-full h-full left-0 top-0  rounded-lg transition-all `}
    >
      <p className="text-4xl flex font-bold uppercase indent-2  items-center gap-x-3 w-fit -mt-16">
        <LucideInfo className="w-10 h-10 font-bold   text-red-400" />
        Error while Authenticating
        <br />
      </p>
    </div>
  );
};

export default Error;
