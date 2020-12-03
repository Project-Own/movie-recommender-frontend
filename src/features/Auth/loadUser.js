import setAuthToken from "./utils/setAuthToken";
import { userLoaded, failure } from "./registerSlice";
import axios from "axios";

//Load User
export const loadUser = async (dispatch) => {
  console.log("Load");
  //   if (localStorage.token) {
  //     setAuthToken(localStorage.token);
  //   }

  console.log("Load");
  try {
    const res = await axios.get("https://vae-login.herokuapp.com/api/auth", {
      headers: {
        "x-auth-token": localStorage.token,
      },
    });
    console.log("User Data");
    console.log(res);
    dispatch(
      userLoaded({
        payload: res.data,
      })
    );
  } catch (err) {
    console.log(err);
    dispatch(
      failure({
        type: "auth_error",
      })
    );
  }
};