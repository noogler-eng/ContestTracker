import { useRecoilState } from "recoil";
import user from "../store/user_atom";

export default function Profile() {
  const [curr_user] = useRecoilState(user);

  return (
    <div className="flex-grow w-full flex items-center justify-center bg-[#121212] min-h-screen p-4">
      <div className="max-w-3xl w-full mx-auto p-6 sm:p-8 mt-10 bg-[#1E1E1E] rounded-2xl shadow-xl backdrop-blur-md border border-[#2A2A2A] text-gray-200">
        {/* Profile Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-8 space-y-6 sm:space-y-0">
          <img
            src={curr_user.picture}
            alt={curr_user.name}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-gray-700 shadow-lg object-cover"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-wide">
              {curr_user.name}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg mt-2">
              {curr_user.email}
            </p>
            <span
              className={`mt-4 inline-block px-5 py-2 rounded-full text-sm font-medium ${
                curr_user.isAdmin ? "bg-green-600" : "bg-blue-600"
              }`}
            >
              {curr_user.isAdmin ? "Admin" : "User"}
            </span>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-10">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-100 mb-4 border-b border-gray-700 pb-2">
            About
          </h3>
          <p className="text-gray-400 leading-relaxed text-base sm:text-lg">
            Welcome to your profile page. Here you can view your personal
            information. Future updates will allow you to customize your profile
            and tweak your account settings to your preference.
          </p>
        </div>
      </div>
    </div>
  );
}
