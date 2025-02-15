import {
  AccountBalance,
  FetchResponse,
  RequestType,
  Transaction,
  User,
} from "../types/index";
import useSwr from "swr";

export const useUser = () => {
  return useSwr<FetchResponse<{ user: User }>>("/user/profile");
};
export const useTransations = (pageIndex: number) => {
  const { data } = useUser();
  return useSwr<FetchResponse<{ transations: Transaction[],count:number }>>(
    data ? "/transations?page=" + pageIndex : null
  );
};
export const useBulkUserByFilter = (filter: string) => {
  return useSwr<FetchResponse<{ users: User[] }>>("user/bulk?filter=" + filter);
};

export const useAccountBalance = () => {
  const { data } = useUser();
  return useSwr<FetchResponse<AccountBalance>>(
    data ? "/account/balance" : null
  );
};

export const useSentRequests = (page:number) => {
  const { data } = useUser();
  return useSwr<FetchResponse<{requests: RequestType[],count:number }>>(
    data ? "/request/sent-requests?page=" + page : null
  );
};

export const useReceivedRequests = (page:number) => {
  const { data } = useUser();
  return useSwr<FetchResponse<{ requests: RequestType[],count:number }>>(
    data ? "/request/received-requests?page=" + page : null
  );
};
