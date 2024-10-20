import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SignInForm = () =>{
    //Step 1: Create state to hold form data
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    //Step 2: Create a submit handler function
    const handleSubmit = async (event) => {
        event.preventDefault(); //Prevent the default from submission behaviour
        try{
            const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
                method: 'POST',
                headers:  {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
            const data = await response.json();
            if(response.ok){
                setSuccessMessage('Successfully logged in!');
                console.log('From Submitted:', data);
                navigate('/dashboard')
            }else {
                setErrorMessage('Failed to log in. Please try again.');
            }
        } catch{
            setErrorMessage('An error occured. Please try again.')
        }
    }
    return(
        <div className='w-full h-screen flex'>
            <div className='border-2 border-grey flex mx-auto h-3/4 my-auto p-5 rounded-lg'>
                <div className='mx-auto my-auto'>
                    <div className='space-y-4 flex p-5'>
                        <div className=''>
                            <h4 className=' w-1/3 font-bold'>Sign in</h4>
                            <p className='text-xs'>Keep calm lets safe guard your data.</p>
                        </div>
                    </div>
                    <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
                        <input 
                        type='text' 
                        placeholder='Enter your email Id' 
                        className='border-2 border-black flex-1 rounded-lg p-2'
                        onChange={(e) => setEmail(e.target.value)} //Update state on input
                        />
                        <input 
                        type='password' 
                        placeholder='Enter your password' 
                        className='border-2 border-black flex-1 rounded-lg p-2'
                        onChange={(e) => setPassword(e.target.value)} 
                        />
                        <button type='submit' className='border-2 border-grey rounded-full p-1'>Submit</button>
                    </form>
                    {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
                    {successMessage && <p className='text-red-500'>{successMessage}</p>}
                </div>
            </div>
        </div>
    );
  
}
export default SignInForm;