import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GoogleLogin } from "@react-oauth/google";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Button from "../magicui/Button";
import user from "@/store/user_atom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const curr_user = useRecoilValue(user);
  const resetUser = useResetRecoilState(user);
  const [menuOpen, setMenuOpen] = useState(false);
  const setUser = useSetRecoilState(user);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    resetUser();
    navigate("/", { replace: true });
  };

  const navLinks = [
    { to: "/my_bookmarks", label: "My Bookmarks" },
    { to: "/profile", label: "Profile" },
    { to: "/practice", label: "Practice" },
  ];

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

  return (
    <header className="w-full shadow-md bg-[#0f0f0f] sticky top-0 z-50 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="Contest-Tracker-Logo.png"
            width={42}
            height={42}
            alt="logo"
          />
          <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight">
            <Link to="/">Tracker</Link>
          </h1>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {curr_user.email ? (
            <>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative text-sm font-medium transition hover:text-gray-300"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
                </Link>
              ))}

              <div className="flex items-center gap-3 pl-4 border-l border-gray-700">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={curr_user.picture || ""}
                    alt={curr_user.name || ""}
                  />
                  <AvatarFallback>{curr_user.name?.[0]}</AvatarFallback>
                </Avatar>
                <div className="text-sm leading-tight">
                  <p className="font-semibold">{curr_user.name}</p>
                  <p className="text-gray-400 text-xs">{curr_user.email}</p>
                </div>
                <Button
                  variant="primary"
                  text="Logout"
                  onClick={handleLogout}
                />
              </div>
            </>
          ) : (
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                const backendURL = import.meta.env.DEV
                  ? import.meta.env.VITE_DEV_BACKEND_URL
                  : import.meta.env.VITE_PROD_BACKEND_URL;
                await axios.post(
                  `${backendURL}/auth/google`,
                  {},
                  { headers: { Authorization: credentialResponse.credential } }
                );
                localStorage.setItem("token", credentialResponse.credential!);

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

                navigate("/", { replace: true });
              }}
              onError={() => console.log("Login Failed")}
            />
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          {menuOpen ? (
            <X
              className="w-7 h-7 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <Menu
              className="w-7 h-7 cursor-pointer"
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[#111111] border-t border-gray-700 px-6 py-4 space-y-4"
          >
            {curr_user.email ? (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block text-sm font-medium hover:text-gray-300"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={curr_user.picture || ""}
                      alt={curr_user.name || ""}
                    />
                    <AvatarFallback>{curr_user.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-semibold">{curr_user.name}</p>
                    <p className="text-gray-400 text-xs">{curr_user.email}</p>
                  </div>
                </div>

                <Button
                  variant="primary"
                  text="Logout"
                  onClick={handleLogout}
                />
              </>
            ) : (
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  const backendURL = import.meta.env.DEV
                    ? import.meta.env.VITE_DEV_BACKEND_URL
                    : import.meta.env.VITE_PROD_BACKEND_URL;
                  await axios.post(
                    `${backendURL}/auth/google`,
                    {},
                    {
                      headers: { Authorization: credentialResponse.credential },
                    }
                  );
                  localStorage.setItem("token", credentialResponse.credential!);

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

                  navigate("/", { replace: true });
                }}
                onError={() => console.log("Login Failed")}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
