import { useRecoilState } from "recoil";
import user from "../store/user_atom";

export default function Profile() {
  const [curr_user] = useRecoilState(user);

  return (
    <div className="flex-grow w-screen flex items-center justify-center">
      <div className="max-w-3xl mx-auto p-8 mt-10 bg-white rounded-2xl shadow-lg">
        <div className="flex items-center space-x-8">
          <img
            src={curr_user.picture}
            alt={curr_user.name}
            className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md object-cover"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {curr_user.name}
            </h2>
            <p className="text-gray-600 text-lg mt-2">{curr_user.email}</p>
            <span
              className={`mt-4 inline-block px-4 py-2 rounded-full text-white text-sm font-medium ${
                curr_user.isAdmin ? "bg-green-600" : "bg-blue-600"
              }`}
            >
              {curr_user.isAdmin ? "Admin" : "User"}
            </span>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">About</h3>
          <p className="text-gray-600 leading-relaxed">
            Welcome to your profile page. Here you can see your personal
            information. In the future, you will be able to update your profile
            and customize your account settings.
          </p>
        </div>
      </div>
    </div>
  );
}
