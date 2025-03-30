import { atom } from "recoil";

const user = atom({
  key: "user",
  default: {
    name: "",
    picture: "",
    email: "",
    isAdmin: false,
    bookmarks: [],
  },
});

export default user;
