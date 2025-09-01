import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import user from "./store/user_atom";
import Profile from "./pages/Profile";
import Bookmarks from "./pages/Bookmarks";
import ContestSolution from "./pages/ContestSolution";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/providers/Authorised";
import Practice from "./pages/Pratice";

const fetchCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const backendURL = import.meta.env.DEV
      ? import.meta.env.VITE_DEV_BACKEND_URL
      : import.meta.env.VITE_PROD_BACKEND_URL;

    const response = await axios.get(`${backendURL}/user/profile`, {
      headers: {
        Authorization: token,
      },
    });

    return response.data.user;
  } catch (error: any) {
    console.error(
      "Error fetching user:",
      error.response?.data || error.message
    );
    return null;
  }
};

function App() {
  const setUser = useSetRecoilState(user);

  useEffect(() => {
    const getUser = async () => {
      const currentUser = await fetchCurrentUser();
      setUser({
        name: currentUser?.name,
        picture: currentUser?.picture,
        email: currentUser?.email,
        college: currentUser?.college,
        rollNo: currentUser?.rollNo,
        branch: currentUser?.branch,
        resume: currentUser?.resume,
        isAdmin: currentUser?.isadmin,
        bookmarks: currentUser?.bookmarks,
        loading: false,
      });
    };
    getUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/my_bookmarks" element={<Bookmarks />} />
            <Route path="/solution/:contestId" element={<ContestSolution />} />
            <Route path="/practice" element={<Practice />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
