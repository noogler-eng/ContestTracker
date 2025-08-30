import { useRecoilState } from "recoil";
import user from "../store/user_atom";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

export default function Profile() {
  const [curr_user, setCurrUser] = useRecoilState(user);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    college: curr_user?.college || "",
    rollNo: curr_user?.rollNo || "",
    branch: curr_user?.branch || "",
    resume: curr_user?.resume || "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const backendURL = import.meta.env.DEV
      ? import.meta.env.VITE_DEV_BACKEND_URL
      : import.meta.env.VITE_PROD_BACKEND_URL;

    try {
      await axios.post(`${backendURL}/user/profile`, formData, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      });
      setCurrUser((prev) => ({ ...prev, ...formData }));
      window.location.reload();
    } catch (err: any) {
      console.log(err.response?.data?.message || "Failed to fetch contest");
    }
    setEditMode(false);
  };

  return (
    <div className="flex-grow w-full flex items-center justify-center bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full mx-auto mt-10"
      >
        <Card className="bg-[#1E1E1E] border border-gray-800 rounded-2xl shadow-xl backdrop-blur-lg p-8 sm:p-10">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <motion.img
              whileHover={{ scale: 1.05 }}
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
                className={`mt-4 inline-block px-5 py-2 rounded-full text-sm font-medium shadow-md ${
                  curr_user.isAdmin
                    ? "bg-green-600/80 text-white"
                    : "bg-blue-600/80 text-white"
                }`}
              >
                {curr_user.isAdmin ? "Admin" : "User"}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 border-t border-gray-700" />

          {/* About Section */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              ✨ About
            </h3>
            <p className="text-gray-400 leading-relaxed text-base sm:text-lg">
              Welcome to your profile page! Here you can view and update your
              personal details. Keep your academic and professional info up to
              date for better networking and opportunities.
            </p>
          </div>

          {/* Extra Details Section */}
          <div className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-white flex items-center gap-2">
                📚 Academic & Professional Details
              </h3>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? "Cancel" : "Edit"}
              </Button>
            </div>

            {!editMode ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-300">
                <div>
                  <p className="text-sm text-gray-500">College</p>
                  <p className="text-base font-medium">
                    {curr_user.college || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Roll No</p>
                  <p className="text-base font-medium">
                    {curr_user.rollNo || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Branch</p>
                  <p className="text-base font-medium">
                    {curr_user.branch || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Resume</p>
                  {curr_user.resume ? (
                    <a
                      href={curr_user.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-400 hover:underline"
                    >
                      View Resume
                    </a>
                  ) : (
                    <p className="text-base font-medium">Not uploaded</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-300">
                <div>
                  <p className="text-sm text-gray-500">College</p>
                  <Input
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Roll No</p>
                  <Input
                    name="rollNo"
                    value={formData.rollNo}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Branch</p>
                  <Input
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Resume Link</p>
                  <Input
                    name="resume"
                    value={formData.resume}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {editMode && (
              <div className="flex justify-end mt-6">
                <Button variant="outline" onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
