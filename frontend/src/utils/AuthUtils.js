import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import api from "../api.js"
import axios from "axios";


class AuthUtils {

    static isAuthenticated() {
        return localStorage.getItem(ACCESS_TOKEN) !== null
    }

    static logout() {
        localStorage.clear()
        return false
    }

    static async refreshToken() {

        console.log("** * * * * * * ")
        console.log(`${import.meta.env.VITE_API_URL}/auth/refresh`)
        console.log("** * * * * * * ")

        const refreshToken = localStorage.getItem(REFRESH_TOKEN)

        if (!refreshToken) {
            return false
        }

        try {
            // const res = await api.post("api/token/refresh/", {
            //     refresh: refreshToken,
            // })

            const res = await api.post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {refresh_token: refreshToken})

            console.log(`${import.meta.env.VITE_API_URL}/auth/refresh`)

            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.access)
                return true
            } else {
                return false
            }
        } catch (error) {
            console.error("Error refreshing token:", error)
            return false;
        }
    }

    static async checkAuthentication(navigateToLogin) {
        if (!this.isAuthenticated()) {
            // User is not authenticated, redirect to login
            // navigateToLogin();
            return false;
        }

        const refreshed = await this.refreshToken();
        if (!refreshed) {
            // Token refresh failed, logout and redirect to login
            this.logout();
            // navigateToLogin();
            return false;
        }

        // User is authenticated
        return true;
    }
}

export default AuthUtils