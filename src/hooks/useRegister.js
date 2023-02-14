import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export const useRegister = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
    const navigate = useNavigate();

    const register = async (credentials) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials)
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if(response.ok) {
            // // save user to local storage
            // localStorage.setItem('user', JSON.stringify(json))

            // //update auth context
            // dispatch ({type: 'LOGIN_SUCCESS', payload: json})

            // setIsLoading(false)
            navigate('/login');
        }

    }

    return {register, isLoading, error}
} 