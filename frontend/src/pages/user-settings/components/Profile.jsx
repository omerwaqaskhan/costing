import React, {useEffect, useState} from 'react';
import axios from 'axios';
import api from "../../../api";
import {useNavigate} from "react-router-dom";
import "../../../styles/Form.css";
import LoadingIndicator from "../../../components/LoadingIndicator";
import {useSelector, useDispatch} from "react-redux";
import {get_current_user} from "../../../api.js";
import {clearUserData, saveUserData} from "../../../redux/userSlice";

function Profile() {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.userData);
    const [initialUserData, setInitialUserData] = useState(null);
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [loading, setLoading] = useState(false);
    const [countries, setCountries] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const fetchCountries = async () => {
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            const countriesData = response.data
                .map((country) => country.name.common)
                .sort((a, b) => a.localeCompare(b)); // Sorts alphabetically
            setCountries(countriesData);
        } catch (error) {
            console.error("Error fetching countries", error);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    const populateFields = (data) => {
        setUsername(data.email || "");
        setGender(data.gender || "");
        setAge(data.age || "");
        setPhone(data.phone || "");
        setCity(data.city || "");
        setCountry(data.country || "");
        setName(data.name || "");
    };

    useEffect(() => {
        if (!userData) {
            setLoading(true);
            get_current_user().then((result) => {
                if (result.success) {
                    dispatch(clearUserData());
                    dispatch(saveUserData(result.data));
                    populateFields(result.data);
                    setInitialUserData(result.data);
                } else {
                    navigate("/login");
                    console.error("Error on Get Current User: ", result.error);
                }
                setLoading(false);
            });
        } else {
            populateFields(userData);
            setInitialUserData(userData);
        }
    }, [userData, dispatch]);

    const hasChanges = () => {
        return (
            gender !== initialUserData?.gender ||
            age !== initialUserData?.age ||
            phone !== initialUserData?.phone ||
            city !== initialUserData?.city ||
            country !== initialUserData?.country
        );
    };

    const validateForm = () => {
        let errors = {};

        // Name validation: should not contain digits
        if (!name || /\d/.test(name)) errors.name = "Name should not contain digits";

        // Gender validation: only 3 options allowed
        if (!gender || !['male', 'female', 'prefer not to mention'].includes(gender)) {
            errors.gender = "Please select a valid gender";
        }

        // Age validation: optional, but if present, should be a non-negative number
        if (age && (isNaN(age) || age < 0)) errors.age = "Please enter a valid age";

        // Phone validation: optional, digits only
        if (phone && !/^\d+$/.test(phone)) errors.phone = "Phone number should only contain digits";

        // City validation: optional, should not contain digits
        if (city && /\d/.test(city)) errors.city = "City name should not contain digits";

        // Country validation: required
        if (!country) errors.country = "Please select a country";

        return errors;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        setErrors(formErrors);
        if (Object.keys(formErrors).length > 0) return;

        if (!hasChanges()) {
            alert("No changes detected");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("gender", gender);
        formData.append("age", age);
        formData.append("phone", phone);
        formData.append("city", city);
        formData.append("country", country);
        formData.append("name", name);

        try {
            const res = await api.post("/users/update-profile", formData, {
                headers: {"Content-Type": "multipart/form-data"},
            });

            if (res.status === 200 || res.status === 201) {
                alert("Profile updated successfully");
                const updatedUserData = {...initialUserData, gender, name, age, phone, city, country};
                dispatch(saveUserData(updatedUserData));
            } else {
                alert("Failed to update profile");
            }
        } catch (error) {
            console.error("Error object:", error);

            if (error.response) {
                // Error from the server with a response object
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                alert("An error occurred: " + error.response.data.detail || "Unauthorized");
            } else if (error.request) {
                // Error making the request but no response received
                console.error("Request error:", error.request);
                alert("No response from server. Please check your network or try again later.");
            } else {
                // Other errors (e.g., network issues)
                console.error("General error:", error.message);
                alert("An unexpected error occurred: " + error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col w-full items-center justify-center mt-10">
            <h1 className="text-[30px] mb-[10px] pt-10">PROFILE</h1>

            <form onSubmit={handleSubmit} className="w-full justify-center">
                <div>
                    <input disabled className="form-input mb-4 w-full" type="text" value={username}
                           placeholder="Username*"/>
                </div>

                <div>
                    <input className="form-input mb-4 w-full" type="text" value={name}
                           onChange={(e) => setName(e.target.value)} placeholder="Name"/>
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div>
                    <select className="form-input mb-4 w-full" value={gender}
                            onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="prefer not to mention">Prefer not to mention</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                </div>

                <div>
                    <input className="form-input mb-4 w-full" type="number" value={age}
                           onChange={(e) => setAge(e.target.value)} placeholder="Age"/>
                    {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
                </div>

                <div>
                    <input className="form-input mb-4 w-full" type="text" value={phone}
                           onChange={(e) => setPhone(e.target.value)} placeholder="Phone"/>
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>

                <div>
                    <input className="form-input mb-4 w-full" type="text" value={city}
                           onChange={(e) => setCity(e.target.value)} placeholder="City"/>
                    {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                </div>

                <div>
                    <select className="form-input mb-4 w-full" value={country}
                            onChange={(e) => setCountry(e.target.value)}>
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </select>
                    {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                </div>

                {loading && <LoadingIndicator/>}
                <button className="form-button" type="submit">UPDATE</button>
            </form>
        </div>
    );
}

export default Profile;


// import React, {useEffect, useState} from 'react'
// import api from "../../../api"
// import {useNavigate} from "react-router-dom"
// import {ACCESS_TOKEN, REFRESH_TOKEN} from "../../../constants"
// import "../../../styles/Form.css"
// import LoadingIndicator from "../../../components/LoadingIndicator"
// import {useSelector, useDispatch} from "react-redux"
// import {get_current_user} from "../../../api.js"  // Function to fetch current user from API
// import {clearUserData, saveUserData} from "../../../redux/userSlice";
// import store from "../../../redux/store.js";
//
//
// function Profile() {
//
//     const dispatch = useDispatch()
//     const userData = useSelector((state) => state.user.userData)
//
//     const [initialUserData, setInitialUserData] = useState(null)
//     const [username, setUsername] = useState("")
//     const [name, setName] = useState("")
//     // const [role, setRole] = useState("")
//     const [gender, setGender] = useState("")
//     const [age, setAge] = useState("")
//     const [phone, setPhone] = useState("")
//     const [city, setCity] = useState("")
//     const [country, setCountry] = useState("")
//     const [loading, setLoading] = useState(false)
//     const navigate = useNavigate()
//
//     // Function to populate form fields with user data
//     const populateFields = (data) => {
//         setUsername(data.email || "");
//         setGender(data.gender || "");
//         setAge(data.age || "");
//         setPhone(data.phone || "");
//         setCity(data.city || "");
//         setCountry(data.country || "");
//         setName(data.name || "");
//     }
//
//     // Fetch user data if not available
//     useEffect(() => {
//         if (!userData) {
//             // If userData is not available, fetch it
//             setLoading(true);
//             get_current_user().then((result) => {
//                 if (result.success) {
//                     dispatch(clearUserData())
//                     dispatch(saveUserData(result.data))  // Save data to Redux
//                     populateFields(result.data)  // Populate form fields
//                     setInitialUserData(result.data)
//                 } else {
//                     navigate("/login")
//                     console.error("Error on Get Current User: ", result.error);
//                 }
//                 setLoading(false);
//             })
//         } else {
//             // Populate form fields with available user data
//             populateFields(userData)
//             setInitialUserData(userData)
//         }
//     }, [userData, dispatch])
//
//     // Check if there are any changes between initial user data and current form values
//     const hasChanges = () => {
//         return (
//             gender !== initialUserData?.gender ||
//             age !== initialUserData?.age ||
//             phone !== initialUserData?.phone ||
//             city !== initialUserData?.city ||
//             country !== initialUserData?.country
//         );
//     }
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//
//         if (!hasChanges()) {
//             alert("No changes detected");
//             return;
//         }
//
//         setLoading(true);
//
//         const formData = new FormData();
//         formData.append("gender", gender);
//         formData.append("age", age);
//         formData.append("phone", phone);
//         formData.append("city", city);
//         formData.append("country", country);
//         formData.append("name", name);
//
//         try {
//             const res = await api.post("/users/update-profile", formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });
//
//             if (res.status === 200 || res.status === 201) {
//                 alert("Profile updated successfully");
//                 const updatedUserData = {
//                     ...initialUserData,
//                     gender,
//                     name,
//                     age,
//                     phone,
//                     city,
//                     country,
//                 };
//                 dispatch(saveUserData(updatedUserData));  // Update Redux state
//             } else {
//                 alert("Failed to update profile");
//             }
//         } catch (error) {
//             alert("An error occurred: " + error.message);
//         } finally {
//             setLoading(false);
//         }
//     }
//
//     return (
//         <div className="flex flex-col w-full items-center justify-center mt-10">
//
//             <h1 className="text-[30px] mb-[10px] pt-10">PROFILE</h1>
//
//             <form onSubmit={handleSubmit} className="w-full justify-center">
//
//                 <input disabled
//                        className="form-input mb-4 w-full"
//                        type="text"
//                        value={username}
//                        onChange={(e) => setUsername(e.target.value)}
//                        placeholder="Username*"
//                 />
//
//                 <input
//                     className="form-input mb-4 w-full"
//                     type="name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="Name"
//                 />
//
//                 {/*<input disabled*/}
//                 {/*    className="form-input mb-4 w-full"*/}
//                 {/*    type="role"*/}
//                 {/*    value={role}*/}
//                 {/*    onChange={(e) => setRole(e.target.value)}*/}
//                 {/*    placeholder="Role"*/}
//                 {/*/>*/}
//
//                 <input
//                     className="form-input mb-4 w-full"
//                     type="gender"
//                     value={gender}
//                     onChange={(e) => setGender(e.target.value)}
//                     placeholder="Gender"
//                 />
//
//                 <input
//                     className="form-input mb-4 w-full"
//                     type="age"
//                     value={age}
//                     onChange={(e) => setAge(e.target.value)}
//                     placeholder="Age"
//                 />
//
//                 <input
//                     className="form-input mb-4 w-full"
//                     type="phone"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     placeholder="Phone"
//                 />
//
//                 <input
//                     className="form-input mb-4 w-full"
//                     type="city"
//                     value={city}
//                     onChange={(e) => setCity(e.target.value)}
//                     placeholder="City"
//                 />
//
//                 <input
//                     className="form-input mb-4 w-full"
//                     type="country"
//                     value={country}
//                     onChange={(e) => setCountry(e.target.value)}
//                     placeholder="Country"
//                 />
//
//                 {loading && <LoadingIndicator/>}
//                 <button className="form-button" type="submit">UPDATE</button>
//
//             </form>
//
//         </div>
//     )
// }
//
// export default Profile