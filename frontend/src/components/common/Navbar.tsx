import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useRecoilValue } from "recoil";
import user from "@/store/user_atom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const curr_user = useRecoilValue(user);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <header className="w-full shadow bg-[#1A1A1A] sticky top-0 z-50 text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl sm:text-2xl font-bold">
          <Link to="/">Contest Tracker</Link>
        </h1>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <Menu
            className="w-6 h-6 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          {curr_user.email ? (
            <>
              <Link to="/my_bookmarks" className="hover:underline text-sm">
                My Bookmarks
              </Link>
              <Link to="/profile" className="hover:underline text-sm">
                Profile
              </Link>

              <Avatar className="w-10 h-10">
                <AvatarImage src={curr_user.picture} alt={curr_user.name} />
                <AvatarFallback>{curr_user.name?.[0]}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{curr_user.name}</p>
                <p className="text-gray-400 text-xs">{curr_user.email}</p>
              </div>

              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                await axios.post(
                  `${import.meta.env.VITE_PROD_BACKEND_URL}/auth/google`,
                  {},
                  {
                    headers: {
                      Authorization: credentialResponse.credential,
                    },
                  }
                );
                localStorage.setItem("token", credentialResponse.credential!);
                window.location.reload();
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              shape="pill"
            />
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#1A1A1A] px-4 py-4 border-t border-gray-700 space-y-4">
          {curr_user.email ? (
            <>
              <Link
                to="/my_bookmarks"
                className="block hover:underline text-sm"
                onClick={() => setMenuOpen(false)}
              >
                My Bookmarks
              </Link>
              <Link
                to="/profile"
                className="block hover:underline text-sm"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>

              <div className="flex items-center gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={curr_user.picture} alt={curr_user.name} />
                  <AvatarFallback>{curr_user.name?.[0]}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">{curr_user.name}</p>
                  <p className="text-gray-400 text-xs">{curr_user.email}</p>
                </div>
              </div>

              <Button
                variant="destructive"
                className="w-full"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                await axios.post(
                  `${import.meta.env.VITE_DEV_BACKEND_URL}/auth/google`,
                  {},
                  {
                    headers: {
                      Authorization: credentialResponse.credential,
                    },
                  }
                );
                localStorage.setItem("token", credentialResponse.credential!);
                window.location.reload();
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              shape="pill"
            />
          )}
        </div>
      )}
    </header>
  );
}
