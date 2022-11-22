import axios from "axios";

export const getTest = () =>
  axios
    .get("http://skku-nickel.iptime.org:8800/codes/users/")
    .then((res) => res.data);
