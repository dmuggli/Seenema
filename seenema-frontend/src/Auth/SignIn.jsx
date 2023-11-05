import React, { useState } from "react"
import { signIn } from "./Auth"
import ConfirmSignUp from "./ConfirmSignUp";
import {useForm} from "react-hook-form";
import Form from "./Form.css"

export default function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const { register } = useForm();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        try {
            await signIn(email, password)
            setSuccess(true)
            // Redirect to the app's main page or dashboard
        } catch (err) {
            setError(err.message)
        }
    }

    if (success) {
        return (
            <div>
                <h1>You are signed In!</h1>
                <p>Explore the app!</p>
            </div>
        )
    }


    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input name="email" required {...register('email', {
                        onChange: (e) => setEmail(e.target.value)
                    })} />
                </div>
                <div>
                    <label>Password</label>
                    <input name="password" type="password" required {...register('password', {
                        onChange: (e) => setPassword(e.target.value)
                    })} />
                </div>
                <button>Sign In</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )
}