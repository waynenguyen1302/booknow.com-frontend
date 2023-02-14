import { useState } from "react";
import { useRegister } from "../../hooks/useRegister";
import './register.css'


const Register = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        password: ''
    })
    const {register, error, isLoading} = useRegister()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        await register(credentials)
    }

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

  return (
    <div className="login">
        <form className="lContainer" onSubmit={handleSubmit}>
            <input type="text" placeholder='username' id='username' onChange={handleChange} className='lInput'/>
            <input type="email" placeholder='email' id='email' onChange={handleChange} className='lInput'/>
            <input type="password" placeholder='password' id='password' onChange={handleChange} className='lInput'/>
            <button disabled={isLoading}  className="lButton" >Register</button>
            {error && <span>{error.message}</span>}
        </form>
    </div>
  )
}

export default Register