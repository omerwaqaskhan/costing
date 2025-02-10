import {useState} from "react"
import api from "../api"
import {useNavigate} from "react-router-dom"
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator"

function RegisterAdminForm({route, method}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const [gender, setGender] = useState("")
    const [age, setAge] = useState("")
    const [phone, setPhone] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        const formData = new FormData();

        formData.append("email", username)
        formData.append("password", password)

        if (role) {
            formData.append("role", role);
        }

        if (gender) {
            formData.append("gender", gender);
        }

        if (age) {
            formData.append("age", age);
        }

        if (phone) {
            formData.append("phone", phone);
        }

        if (city) {
            formData.append("city", city);
        }

        if (country) {
            formData.append("country", country);
        }

        try {
            const res = await api.post(route, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Check if the response status is in the range of success (200-299)
            if (res.status >= 200 && res.status < 300) {
                navigate("/login");
            } else {
                // Handle unexpected status codes
                alert("Unexpected response from the server. Please try again.");
            }
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                const message = error.response.data?.detail || "An error occurred. Please try again.";
                alert(message);
            } else if (error.request) {
                // Request was made but no response was received
                alert("No response from the server. Please check your network connection.");
            } else {
                // Something else happened in setting up the request
                alert("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    return <form onSubmit={handleSubmit} className="form-container w-full">

        <h1 className="py-5 text-[22px]">NEW ACCOUNT</h1>

        <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username*"
        />

        <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password*"
        />

        <input
            className="form-input"
            type="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role"
        />

        <input
            className="form-input"
            type="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Gender"
        />

        <input
            className="form-input"
            type="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
        />

        <input
            className="form-input"
            type="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
        />

        <input
            className="form-input"
            type="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
        />

        <input
            className="form-input"
            type="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
        />

        {loading && <LoadingIndicator/>}
        <button className="form-button" type="submit">CREATE</button>

    </form>
}

export default RegisterAdminForm