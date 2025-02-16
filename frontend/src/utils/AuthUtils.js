import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import api from "../api.js"
import axios from "axios";


class AuthUtils {

    static logout() {
        localStorage.clear()
        return false
    }
}

export default AuthUtils