import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

const RegisterForm = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {handleRegister} = useAuth()

    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault()

        handleRegister(username, email, password).then(navigate("/login"))
    }

  return (
    <main className="form-layout">
        <div className="form-top">
            <p id="form-title">Get Started Now</p>
            <p id="form-subtitle">Create an account to continue.</p>
        </div>
        <form className="main-form" onSubmit={handleFormSubmit}>
            <div className="form-input">
                <p>Username</p>
                <input type="text"
                       value={username}
                       onChange={(e) => (setUsername(e.target.value))}
                />
            </div>
            <div className="form-input">
                <p>Email address</p>
                <input type="email" 
                       value={email}
                       onChange={(e) => (setEmail(e.target.value))}
                />
            </div>
            <div className="form-input">
                <p>Password</p>
                <input type="password" 
                       value={password}
                       onChange={(e) => (setPassword(e.target.value))}
                />
            </div>

            <button type="submit">
                Register
            </button>
        </form>
        <div className="form-redirect">
            Have an account ? <Link className="form-redirect-cta" to="/login">Log In.</Link>
        </div>
    </main>
  )
}

export default RegisterForm
