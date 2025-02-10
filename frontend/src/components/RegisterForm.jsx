import {useState, useEffect} from "react";
import {register} from "../api";
import {useNavigate} from "react-router-dom";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";
import Dialog from "../components/Dialog.jsx";
import axios from "axios";

function RegisterForm() {
    const [loading, setLoading] = useState(false);
    const [registerationSuccess, setRegisterationSuccess] = useState(false);
    const [error, setError] = useState({}); // Error state initialized as an object
    const navigate = useNavigate();
    const [countries, setCountries] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        gender: '',
        phone: '',
        city: '',
        country: '',
        age: '',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

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

    const validateForm = (formData) => {
    let errors = {};

    // Required field validations
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Invalid email address";
    }
    if (!formData.password || formData.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
    }
    if (!formData.name || /\d/.test(formData.name)) {
        errors.name = "Name can't be empty and should not contain digits";
    }
    if (!formData.gender && !['male', 'female', 'prefer not to mention'].includes(formData.gender)) {
        errors.gender = "Please select a valid gender";
    }

    // Optional field validations (only check if they have values)
    if (formData.phone && !/^\d+$/.test(formData.phone)) {
        errors.phone = "Phone number should only contain digits";
    }
    if (formData.city && /\d/.test(formData.city)) {
        errors.city = "City name should not contain digits";
    }
    if (formData.country && /\d/.test(formData.country)) {
        errors.country = "Country name should not contain digits";
    }

    return errors;
};


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError({}); // Clear previous errors

        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length > 0) {
            setError(validationErrors);
            setLoading(false);
            return;
        }

        // Append data for submission
        const submissionData = new FormData();
        // Object.keys(formData).forEach(key => submissionData.append(key, formData[key]));
        Object.keys(formData).forEach(key => {
            if (formData[key]) {
                submissionData.append(key, formData[key]);
            }
        });

        try {
            const result = await register(submissionData, navigate);
            if (result.success) setRegisterationSuccess(true);
        } catch (error) {
            if (error.response && error.response.data.detail) {
                setError({form: error.response.data.detail});
            } else {
                setError({form: error.message});
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDialogConfirm = () => {
        setRegisterationSuccess(false);
        navigate('/login'); // Navigate to login page
    };

    return (
        <div className="flex flex-col items-center">
            {registerationSuccess ? (
                <Dialog
                    isOpen={registerationSuccess}
                    heading="Registration Successful!"
                    message="Please log in and remember to verify your email."
                    onConfirm={handleDialogConfirm}
                />
            ) : (
                <form onSubmit={handleSubmit} className="form-container w-full">
                    <h1 className="py-5 text-[22px]">NEW ACCOUNT</h1>

                    {error.form &&
                        <div className="error-message text-red-600 align-middle text-center">{error.form}</div>}

                    <div className="w-full">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email*"
                            className="border border-gray-300 p-2 w-full mb-2 rounded"
                        />
                        {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
                    </div>

                    <div className="w-full">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password*"
                            className="border border-gray-300 p-2 w-full mb-2 rounded"
                        />
                        {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
                    </div>

                    <div className="w-full">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Name*"
                            className="border border-gray-300 p-2 w-full mb-2 rounded"
                        />
                        {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
                    </div>

                    <div className="w-full">
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-2 w-full mb-2 mt-2 rounded"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Prefer not to mention">Prefer not to mention</option>
                        </select>
                        {error.gender && <p className="text-red-500 text-sm">{error.gender}</p>}
                    </div>

                    <div className="w-full">
                        <input
                            className="form-input border border-gray-300 p-2 w-full mb-2 rounded"
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            placeholder="Age"
                            min="1"
                        />
                        {error.age && <p className="text-red-500 text-sm">{error.age}</p>}
                    </div>

                    <div className="w-full">
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Phone"
                            className="border border-gray-300 p-2 w-full mb-2 rounded"
                        />
                        {error.phone && <p className="text-red-500 text-sm">{error.phone}</p>}
                    </div>

                    <div className="w-full">
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="City"
                            className="border border-gray-300 p-2 w-full mb-2 rounded"
                        />
                        {error.city && <p className="text-red-500 text-sm">{error.city}</p>}
                    </div>

                    <div className="w-full">
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-2 w-full mb-2 mt-2 rounded"
                        >
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                        {error.country && <p className="text-red-500 text-sm">{error.country}</p>}
                    </div>

                    {loading && <LoadingIndicator/>}

                    <button className="form-button" type="submit">CREATE</button>
                </form>
            )}
        </div>
    );
}

export default RegisterForm;


// import {useState, useEffect} from "react"
// import {register} from "../api"
// import {useNavigate} from "react-router-dom"
// import "../styles/Form.css"
// import LoadingIndicator from "./LoadingIndicator"
// import Dialog from "../components/Dialog.jsx"
// import axios from "axios"
//
//
// function RegisterForm() {
//     const [username, setUsername] = useState("");
//     const [name, setName] = useState("");
//     const [password, setPassword] = useState("");
//     const [gender, setGender] = useState("");
//     const [age, setAge] = useState("");
//     const [phone, setPhone] = useState("");
//     const [city, setCity] = useState("");
//     const [country, setCountry] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [registerationSuccess, setRegisterationSuccess] = useState(false);
//     const [error, setError] = useState(""); // Error state
//     const navigate = useNavigate();
//     const [countries, setCountries] = useState([]);
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         gender: '',
//         phone: '',
//         city: '',
//         country: '',
//     });
//
//     const handleInputChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };
//
//     const fetchCountries = async () => {
//         try {
//             const response = await axios.get('https://restcountries.com/v3.1/all');
//             const countriesData = response.data.map((country) => country.name.common);
//             setCountries(countriesData);
//         } catch (error) {
//             console.error("Error fetching countries", error);
//         }
//     };
//
//     useEffect(() => {
//         fetchCountries();
//     }, []);
//
//     const validateForm = (formData) => {
//         let errors = {};
//
//         // Email validation: valid email format
//         if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
//             errors.email = "Invalid email address";
//         }
//
//         console.log("after email")
//
//         // Password validation: at least 8 characters
//         if (!formData.password || formData.password.length < 8) {
//             errors.password = "Password must be at least 8 characters";
//         }
//
//         console.log("after password")
//
//         // Name validation: should not contain digits
//         if (!formData.name || /\d/.test(formData.name)) {
//             errors.name = "Name should not contain digits";
//         }
//
//         console.log("after name")
//
//         // Gender validation: only 3 options allowed
//         if (!['male', 'female', 'prefer not to mention'].includes(formData.gender)) {
//             errors.gender = "Please select a valid gender";
//         }
//
//         console.log("after gender")
//
//         // Phone validation: digits only
//         if (!formData.phone || !/^\d+$/.test(formData.phone)) {
//             errors.phone = "Phone number should only contain digits";
//         }
//
//         console.log("after phone")
//
//         // City validation: no digits allowed
//         if (!formData.city || /\d/.test(formData.city)) {
//             errors.city = "City name should not contain digits";
//         }
//
//         console.log("after city")
//
//         // Country validation: no digits allowed
//         if (!formData.country || /\d/.test(formData.country)) {
//             errors.country = "Country name should not contain digits";
//         }
//
//         console.log("after country")
//
//         return errors;
//     };
//
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError(""); // Clear any previous errors
//
//         const validationErrors = validateForm(formData)
//
//         console.log("after validationErrors")
//
//         if (Object.keys(validationErrors).length > 0) {
//             setError(validationErrors);
//             setLoading(false);
//             return;
//         }
//
//         console.log("* * * * * * * * * * * * * * * * *")
//         console.log("* * * * * * * * * * * * * * * * *")
//         console.log("after validations")
//         console.log("* * * * * * * * * * * * * * * * *")
//         console.log("* * * * * * * * * * * * * * * * *")
//
//         // const formData = new FormData();
//
//         formData.append("email", formData.email);
//         formData.append("password", formData.password);
//         formData.append("name", formData.name);
//
//         if (formData.gender) formData.append("gender", formData.gender);
//         if (formData.age) formData.append("age", formData.age);
//         if (formData.phone) formData.append("phone", formData.phone);
//         if (formData.city) formData.append("city", formData.city);
//         if (formData.country) formData.append("country", formData.country);
//
//         try {
//             const result = await register(formData, navigate);
//             if (result.success) {
//                 setRegisterationSuccess(true);
//             }
//         } catch (error) {
//             // If error has a response and a detail field, show it
//             if (error.response && error.response.data.detail) {
//                 setError(error.response.data.detail);
//             } else {
//                 setError(error.message);
//             }
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const handleDialogConfirm = () => {
//         setRegisterationSuccess(false);
//         navigate('/login'); // Navigate to login page
//     }
//
//     return (
//
//         <div className="flex flex-col items-center">
//             {registerationSuccess ? (
//                 <Dialog
//                     isOpen={registerationSuccess}
//                     heading="Registration Successful!"
//                     message="Please log in and remember to verify your email."
//                     onConfirm={handleDialogConfirm}
//                 />
//             ) : (
//
//                 <form onSubmit={handleSubmit} className="form-container w-full">
//                     <h1 className="py-5 text-[22px]">NEW ACCOUNT</h1>
//
//                     {error && <div
//                         className="error-message text-blue-600 align-middle text-center">{error}</div>} {/* Error message */}
//
//                     <div className="w-full">
//                         <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleInputChange}
//                             placeholder="Email*"
//                             className="border border-gray-300 p-2 w-full mb-2 rounded"
//                         />
//                         {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
//                     </div>
//
//                     <div className="w-full">
//                         <input
//                             type="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleInputChange}
//                             placeholder="Password*"
//                             className="border border-gray-300 p-2 w-full mb-2 rounded"
//                         />
//                         {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
//                     </div>
//
//                     <div className="w-full">
//                         <input
//                             type="text"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleInputChange}
//                             placeholder="Name*"
//                             className="border border-gray-300 p-2 w-full mb-2 rounded"
//                         />
//                         {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
//                     </div>
//
//                     <div className="w-full">
//                         <select
//                             name="gender"
//                             value={formData.gender}
//                             onChange={handleInputChange}
//                             className="border border-gray-300 p-2 w-full mb-2 rounded"
//                         >
//                             <option value="">Select Gender</option>
//                             <option value="male">Male</option>
//                             <option value="female">Female</option>
//                             <option value="prefer not to mention">Prefer not to mention</option>
//                         </select>
//                         {error.gender && <p className="text-red-500 text-sm">{error.gender}</p>}
//                     </div>
//
//                     <div className="w-full">
//                         <input
//                             className="form-input border border-gray-300 p-2 w-full mb-2 rounded"
//                             type="number"
//                             value={formData.age}
//                             onChange={(e) => setFormData({...formData, age: e.target.value})}
//                             placeholder="Age"
//                             min="1"
//                         />
//                         {error.age && <p className="text-red-500 text-sm">{error.age}</p>}
//                     </div>
//
//                     <div className="w-full">
//                         <input
//                             type="text"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleInputChange}
//                             placeholder="Phone"
//                             className="border border-gray-300 p-2 w-full mb-2 rounded"
//                         />
//                         {error.phone && <p className="text-red-500 text-sm">{error.phone}</p>}
//                     </div>
//
//                     <div className="w-full">
//                         <input
//                             type="text"
//                             name="city"
//                             value={formData.city}
//                             onChange={handleInputChange}
//                             placeholder="City"
//                             className="border border-gray-300 p-2 w-full mb-2 rounded"
//                         />
//                         {error.city && <p className="text-red-500 text-sm">{error.city}</p>}
//                     </div>
//
//                     <div className="w-full">
//                         <select
//                             name="country"
//                             value={formData.country}
//                             onChange={handleInputChange}
//                             className="border border-gray-300 p-2 w-full mb-2 rounded"
//                         >
//                             <option value="">Select Country</option>
//                             {countries.map((country) => (
//                                 <option key={country} value={country}>
//                                     {country}
//                                 </option>
//                             ))}
//                         </select>
//                         {error.country && <p className="text-red-500 text-sm">{error.country}</p>}
//                     </div>
//
//                     {loading && <LoadingIndicator/>}
//
//                     <button className="form-button" type="submit">CREATE</button>
//                 </form>
//             )}
//         </div>
//     )
// }
//
// export default RegisterForm;
