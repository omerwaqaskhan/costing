import { useState } from "react"
import api from "../api"
import { useNavigate, Link } from "react-router-dom"
import "../styles/Form.css"
import LoadingIndicator from "../components/LoadingIndicator"

function ForgotPassword() {
    const [username, setUsername] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {

        setLoading(true)
        e.preventDefault()

        const formData = new FormData();
        formData.append("email", username);

        try {
            const res = await api.post("auth/forgot-password", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (res.status === 200) {
                navigate("/login")
            }

        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="pt-[75px]">
            <form onSubmit={handleSubmit} className="form-container">

                <h1 className="py-5 text-[22px]">Forgot Password</h1>

                <input
                    className="form-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username/Email"
                />

                {loading && <LoadingIndicator />}
                <button className="form-button" type="submit">Send</button>
            </form>
        </div>
    )
}

export default ForgotPassword