import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useRecoilValue } from "recoil";
import user from "@/store/user_atom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export default function Navbar() {
  const curr_user = useRecoilValue(user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <header className="w-full shadow bg-[#1A1A1A] sticky top-0 z-50 text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">Contest Tracker</Link>
        </h1>

        <div className="flex items-center gap-6">
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
                console.log(credentialResponse);
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
            />
          )}
        </div>
      </div>
    </header>
  );
}
