import { useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const RegistrationForm = () =>{
    const navigate =  useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    

    const [formData, setFormData] =useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: 'ADMIN'
    });

    //Handle form data changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData, //Keep previous data
            [name]: value // Update thr specific field
        });
    };

    // Toggle password visibility
    const togglePasswordVisibility = () =>{
        setShowPassword((prevShowPassword) => !prevShowPassword);
    }

    // Handle form Submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent page refresh

        const { firstName, lastName, email, password } = formData; // Destructure the form data
        if(!firstName || !lastName || !email || !password){
            alert("Please fill all fields.");
            return;
        }

        // Validate password
        const passwordRegex = /^(?=.*[0-9](?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]){8,}$/;
        if(!passwordRegex.test(password)){
            alert("Password m ust be at least 8 characters long, contaian one symbol and one special character.")
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return; // Prevent submission
        }

        //Send POST request using axios
        axios.post(`${process.env.REACT_APP_BASE_URL}account`, formData)
        .then(response => {
            console.log('Registration successful: ', response)

            // Check if the response status is true, then Navigate
            if (response.data.status === true){
                navigate('/dashboard'); // Navigatye to the dashboard
            } else {
                alert("Something went wrong.");
            }
        })
        .catch(error => {
            console.error('There was an error registring!', error)
        });
    }

    return(
        <div className="border-2 border-black flex w-full h-screen">
            <div className="border-2 border-gray-300 w-80 h-3/4 my-auto mx-auto py-20 rounded-lg">
                <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
                    <input 
                    type="text" 
                    name="firstName" //Name attribute
                    placeholder="First Name" 
                    className="border-2 border-gray-400 mx-auto rounded-lg px-2"
                    value={formData.firstName}
                    onChange={handleChange}
                    />
                    <input 
                    type="text" 
                    name="lastName"
                    placeholder="Last Name" 
                    className="border-2 border-gray-400 mx-auto rounded-lg px-2"
                    value={formData.lastName}
                    onChange={handleChange}
                    />
                    <input 
                    type="email" 
                    name="email"
                    placeholder="example@email.com" 
                    className="border-2 border-gray-400 mx-auto rounded-lg px-2"
                    value={formData.email}
                    onChange={handleChange}
                    />
                    <div className="relative border-2 border-gray-400 w-62 rounded-lg mx-auto">
                        <input 
                        type={showPassword ? "text" : "password"} // Toggle between text and password
                        name="password"
                        placeholder="Password" 
                        className=" mx-auto rounded-lg px-2"
                        value={formData.password}
                        onChange={handleChange}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    
                    <p className=" flex items-center w-56 text-xs mx-auto">What's your role? 
                        <select 
                        name="role" 
                        className="ml-2"
                        value={formData.role}
                        onChange={handleChange}
                        >
                            <option value="ADMIN">ADMIN</option>
                            <option value="CUSTOMER">CUSTOMER</option>
                        </select>
                    </p>
                    <button type="submit" className="border-2 border-gray-400 w-56 mx-auto p-1 rounded-2xl">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default RegistrationForm;