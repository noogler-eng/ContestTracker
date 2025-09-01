import { atom } from "recoil";

const user = atom({
  key: "user",
  default: {
    name: "",
    picture: "",
    college: "",
    rollNo: "",
    branch: "",
    email: "",
    resume: "",
    isAdmin: false,
    loading: true,
    bookmarks: [],
  },
});

export default user;
