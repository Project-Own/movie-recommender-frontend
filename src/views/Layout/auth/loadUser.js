import setAuthToken from "./utils/setAuthToken";
import {userLoaded, failure} from "./registerSlice";
import axios from "axios";



//Load User
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
        const res= await axios.get('/api/auth');

        dispatch(
            userLoaded({
                 payload: res.data
            })
        );
    } catch (err) {
        dispatch(failure({
            type: "auth_error"
            })
        );
    }
}