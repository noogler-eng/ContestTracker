import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "@/store/user_atom";

export function ProtectedRoute() {
  const user = useRecoilValue(userAtom);

  // While user state is initializing
  if (user.loading) {
    return <div>Loading...</div>; 
  }

  // After initialization, if no email -> redirect
  if (!user?.email) {
    return <Navigate to="/" replace />;
  }

  // Otherwise render children
  return <Outlet />;
}
