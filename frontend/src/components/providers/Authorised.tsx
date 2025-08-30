import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "@/store/user_atom";

export function ProtectedRoute() {
  const user = useRecoilValue(userAtom);

  // if not logged in -> redirect to landing or login page
  if (!user?.email) {
    return <Navigate to="/" replace />;
  }

  // else render child routes
  return <Outlet />;
}
