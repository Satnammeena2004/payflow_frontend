
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { axiosInstance } from "../services/fetcher";
// import { useNavigate } from "react-router-dom";
export const AuthState = createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated?: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
  isLoading: boolean;
  login: () => void;
}>({
  isAuthenticated: false,
  isLoading: false,
  logout: () => {},
  login: () => {},
});

export default function AuthStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    JSON.parse(localStorage.getItem("isAuthenticated") as string)
  );
  const [isLoading, setIsLoading] = useState(true);

  const login = () => {
    localStorage.setItem("isAuthenticated", JSON.stringify(true));
    setIsAuthenticated(true);
  };
  const logout = async () => {
    const res = await axiosInstance.get("/user/logout");
    if (res.data.success) {
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    try {
      async function getSessionId() {
        setIsLoading(true);
        const res = await axiosInstance.get("/auth/session");
        if (res.data.success) {
          localStorage.setItem("isAuthenticated", JSON.stringify(true));
          setIsAuthenticated(true);
          return;
        }
      }
      getSessionId().catch(() => {
        localStorage.setItem("isAuthenticated", JSON.stringify(false));
        setIsAuthenticated(false);
      });
    } catch (error) {
      localStorage.setItem("isAuthenticated", JSON.stringify(false));
      setIsAuthenticated(false);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return (
    <AuthState.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout, isLoading, login }}
    >
      {children}
    </AuthState.Provider>
  );
}

export const useAuth = () => useContext(AuthState);
