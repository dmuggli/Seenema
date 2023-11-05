import React, { useState } from "react"
import { signUp } from "./Auth"
import ConfirmSignUp from "./ConfirmSignUp";
import {useForm} from "react-hook-form";
import Form from "./Form.css"

export default function SignUp() {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const { register } = useForm();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        try {
            await signUp(firstname, lastname, email, password)
            setSuccess(true)
        } catch (err) {
            setError(err.message)
        }
    }

    if (success) {
        return (
            <ConfirmSignUp email={email}/>
        )
    }

    return (
        <div>
            <h1>SignUp</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name</label>
                    <input name="First Name" required {...register('First Name', {
                        onChange: (e) => setFirstname(e.target.value)
                    })} />
                </div>
                <div>
                    <label>Last Name</label>
                    <input name="Last Name" required {...register('Last Name', {
                        onChange: (e) => setLastname(e.target.value)
                    })} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email"  required {...register('email', {
                        onChange: (e) => setEmail(e.target.value)
                    })} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" required {...register('password', {
                        onChange: (e) => setPassword(e.target.value)
                    })} />
                </div>
                {error && <p>{error}</p>}
                <button>Sign Up</button>
            </form>
            {/*{error && <p>{error}</p>}*/}
        </div>
    )
}