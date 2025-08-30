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
    bookmarks: [],
  },
});

export default user;
