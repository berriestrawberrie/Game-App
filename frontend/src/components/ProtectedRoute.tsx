// components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuthStore } from "../store/authStore";
import Loading from "./Loading";
import Layout from "./Layout";

interface Props {
  children: ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user, authLoading } = useAuthStore();

  // ✅ 1. While Firebase is still checking auth state, render nothing (or a loader)
  if (authLoading) {
    return (
      <>
        <Layout title="">
          <Loading />
        </Layout>
      </>
    ); // or <Spinner />
  }

  // ✅ 2. After authLoading is false, we know the real auth state
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // ✅ 3. User is authenticated
  return <>{children}</>;
};

export default ProtectedRoute;
