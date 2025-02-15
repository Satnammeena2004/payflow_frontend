import { SWRConfig } from "swr";
import { ReactNode } from "react";
import { fetcher } from "./services/fetcher";
const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus:false,
        errorRetryCount:2,
        loadingTimeout:3000
        
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default Provider;
