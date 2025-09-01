import { atom } from "recoil";

const user = atom({
  key: "user",
  default: {
    name: null,
    picture: null,
    college: null,
    rollNo: null,
    branch: null,
    email: null,
    resume: null,
    isAdmin: false,
    loading: true,
    bookmarks: [],
  },
});

export default user;
