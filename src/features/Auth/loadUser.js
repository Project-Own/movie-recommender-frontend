import setAuthToken from "./utils/setAuthToken";
import { userLoaded, failure, selectToken } from "./registerSlice";
import axios from "axios";
import { useSelector } from "react-redux";

//Load User
export const loadUser = async (dispatch, token) => {
  console.log("Load");
  //   if (localStorage.token) {
  //     setAuthToken(localStorage.token);
  //   }

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
    // dispatch(
    //   failure({
    //     type: "auth_error",
    //   })
    // );
  }
};
