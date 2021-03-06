import { userLoaded, failure } from "./registerSlice";
import axios from "axios";

//Load User
export const loadUser = async (dispatch) => {
  const token = localStorage.getItem("token");
  if (token && typeof token !== "undefined") {
    console.log("Load");
    console.log(token);
    try {
      const res = await axios.get("https://vae-login.herokuapp.com/api/auth", {
        headers: {
          "x-auth-token": token,
        },
      });
      console.log("User Data");
      console.log(res);
      dispatch(userLoaded(res.data));
    } catch (err) {
      console.log("Failure to load Data From Token");
      console.log(err);
      dispatch(
        failure({
          type: "auth_error",
        })
      );
    }
  }
};
