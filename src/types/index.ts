export type CreateRequestType = {
  lender_id: string | undefined;
  request_type: "Due" | "Borrow";
  amount: number;
};

export type RequestTypeForRequest = {
  type: string;
  sender_account_id: string;
  receiver_account_id: string;
  amount: string;
  request_type: string;
};

export interface User {
  account_id: {
    _id: string;
    balance: number;
  };
  _id: string;
  name: string;
  email: string;
  phone: string;
  profilePicture?: string;
  balance: number;
  twoFactorEnabled: boolean;
}

export type AccountBalance = {
  account: {
    _id: string;
    account_number: string;
    currency: string;
    balance: number;
  };
};

export type FetchResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
};

export interface Transaction {
  id: string;
  amount: number;
  type: "send" | "receive";
  status: "pending" | "success" | "failed";
  date: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  receiverName: string;
  notes?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

export type MenuItems = {
  path: string;
  label: string;
  icon: React.FC;
  children?: MenuItems[];
};

export type PickedUser = Pick<User, "_id" | "name" | "account_id" | "email">;

export type RequestType = {
  _id: string;
  requester_id: PickedUser;

  lender_id: PickedUser;
  status: "pending" | "approved" | "rejected";
  request_type: "due" | "borrow";
  completed_date: Date;
  request_date: Date;
  amount: number;
};
