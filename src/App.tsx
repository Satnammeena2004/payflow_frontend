import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { lazy, Suspense } from "react";
import { useAuth } from "./context/Auth_Context";
import LoadingPage from "./components/loading";
// import { useOnline } from "./hooks/useOnline";
const Transactions = lazy(() => import("./pages/Transactions"));
const SendMoney = lazy(() => import("./pages/SendMoney"));
const Profile = lazy(() => import("./pages/Profile"));
const SentRequest = lazy(() => import("./pages/SentReq"));
const ReceivedRequest = lazy(() => import("./pages/ReceivedReq"));
const CreateRequest = lazy(() => import("./pages/CreateRequest"));

function App() {
  // For demo purposes, we'll assume the user is authenticated
  const { isLoading, isAuthenticated: auth } = useAuth();
  const isLocalAuthentication = JSON.parse(
    localStorage.getItem("isAuthenticated") as string
  );
  const isAuthenticated = auth || isLocalAuthentication;
  console.log(`isAuthenticated: `, auth, isLocalAuthentication);

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <Routes>
      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/signup"
        element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />}
      />

      {/* Protected Routes */}
      {isAuthenticated ? (
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/send"
            element={
              <Suspense fallback={<LoadingPage />}>
                <SendMoney />
              </Suspense>
            }
          />
          <Route
            path="/transactions"
            element={
              <Suspense fallback={<LoadingPage />}>
                <Transactions />
              </Suspense>
            }
          />
          <Route
            path="/profile"
            element={
              <Suspense fallback={<LoadingPage />}>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path="/create-request"
            element={
              <Suspense fallback={<LoadingPage />}>
                <CreateRequest />
              </Suspense>
            }
          />
          <Route
            path="/sent-requests"
            element={
              <Suspense fallback={<LoadingPage />}>
                <SentRequest />
              </Suspense>
            }
          />
          <Route
            path="/received-requests"
            element={
              <Suspense fallback={<LoadingPage />}>
                <ReceivedRequest />
              </Suspense>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Route>
      ) : (
        // <></>
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
    // </Router>
  );
}

export default App;
