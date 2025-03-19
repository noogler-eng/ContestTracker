import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import { useSetRecoilState } from "recoil";
import user from "./store/user_atom";
import Profile from "./pages/Profile";
import Bookmarks from "./pages/Bookmarks";

const fetchCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const response = await axios.get("http://localhost:4000/user/profile", {
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
        name: currentUser.name,
        picture: currentUser.picture,
        email: currentUser.email,
        isAdmin: currentUser.isadmin,
        bookmarks: currentUser.bookmarks,
      });
    };
    getUser();
  }, []);

  return (
    <div className="bg-[#1A1A1A] flex flex-col min-h-screen">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my_bookmarks" element={<Bookmarks />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
