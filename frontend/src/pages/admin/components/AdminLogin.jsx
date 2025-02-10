import {useState} from "react"
import api from "../../../api"
import {useNavigate, Link} from "react-router-dom"
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../../constants"
import "../../../styles/Form.css"
import LoadingIndicator from "../../../components/LoadingIndicator.jsx"
import {login, get_current_user} from "../../../api"
import {saveUserData} from "../../../redux/userSlice"
import {useDispatch} from "react-redux"


function AdminLogin() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [showError, setShowError] = useState(false)
    const navigate = useNavigate()

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        setShowError(false)
        setLoading(true)
        e.preventDefault()

        try {
            // Use the login function from api.js
            const result = await login(username, password)
            if (result.success) {

                const userResult = await get_current_user();

                if (userResult.success) {
                    // Dispatch the user data to Redux
                    dispatch(saveUserData(userResult.data));
                } else {
                    console.error(userResult.error);
                }

                navigate("/");
            } else {
                setShowError(true)
            }
        } catch (error) {
            setShowError(true)
        } finally {
            setLoading(false)
        }
    }

    return <form onSubmit={handleSubmit} className="form-container">

        <h1 className="py-5 text-[22px]">Login</h1>

        <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />

        <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        {loading && <LoadingIndicator/>}
        {showError && <p className="text-red-500 items-center"> Incorrect Username or Password! </p>}
        <button className="form-button" type="submit">Login</button>

        <div className="flex w-full items-end justify-end">
            <p className="text-gray-500 text-[14px]">
                <Link to="/forgot-password" className="text-blue-500 hover:underline items-end">
                    Forgot Password?
                </Link></p>
        </div>
    </form>
}

export default AdminLogin