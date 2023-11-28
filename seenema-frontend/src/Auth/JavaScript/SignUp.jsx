import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {signUp} from "./Auth"
import ConfirmSignUp from "./ConfirmSignUp";
import {Link} from "react-router-dom";
import seenemaLogo from '../../assets/SeenemaLogo.png';
import "../CSS/Form.css";
import '../JavaScript/SignIn';

// component for user sign-up
export default function SignUp() {
    // State variables to handle the code
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
    const {register} = useForm();


    // handles the submission of the form
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        try {
            // try to signup using provided user details
            await signUp(firstname, lastname, email, password)
            setSuccess(true)
        } catch (err) {
            // Set the error message
            setError(err.message.replace(/\n/g, '<br />'));
        }
    }
    // if success is true, go to confirmSignUp
    if (success) {
        return (
            <ConfirmSignUp email={email}/>
        )
    }

    // renders the SignUp component
    return (
        <div className="bg-Poster">
            <div className="auth-Form">
                <div className="logo-auth">
                    <img
                        src={seenemaLogo}
                        alt={"Logo is here"}
                    />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="heading-auth">
                        <h2>Sign Up</h2>
                    </div>
                    <div>
                        <div>
                            <label className="label-names">First Name</label>
                            <input className="auth-input" name="First Name" placeholder="Enter your first name"
                                   required {...register('First Name', {
                                onChange: (e) => setFirstname(e.target.value)
                            })} />
                        </div>
                    </div>
                    <div>
                        <label className="label-names">Last Name</label>
                        <input className="auth-input" name="Last Name" required
                               placeholder="Enter your last name"{...register('Last Name', {
                            onChange: (e) => setLastname(e.target.value)
                        })} />
                    </div>
                    <div>
                        <label className="label-names">Email</label>
                        <input className="auth-input" type="email" name="email" placeholder="Enter your email"
                               required {...register('email', {
                            onChange: (e) => setEmail(e.target.value)
                        })} />
                    </div>
                    <div>
                        <label className="label-names">Password</label>
                        <input className="auth-input" type="password" name="password" placeholder="Enter your password"
                               required {...register('password', {
                            onChange: (e) => setPassword(e.target.value)
                        })} />
                    </div>
                    {/*{error && <p style={{paddingTop: "10px", textAlign: "left", color: "#E63946"}}>{error}</p>}*/}
                    {error && <p style={{ paddingTop: "10px", textAlign: "left", color: "#E63946" }} dangerouslySetInnerHTML={{ __html: error }} />}
                    <button style={{marginTop: "30px"}} className="generic-button-auth button-auth">Sign Up</button>
                </form>
                <p style={{marginTop: '20px', textAlign: 'left'}}>Already have an account? <Link to="/signIn"
                                                                                                 style={{color: 'inherit'}}>Sign
                    In</Link></p>
            </div>
        </div>
    )
}