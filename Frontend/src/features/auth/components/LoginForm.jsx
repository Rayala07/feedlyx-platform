import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
    const [identifier, setIdentifier] = useState("")
    const [password, setPassword] = useState("")

    const {handleLogin, loading} = useAuth();

    const navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleLogin(identifier, password).then(navigate("/"))
    }

    if(loading) {
        return (
            <main>
                <img src="/media/images/pacman-loading.svg" alt="Loading..." />
            </main>
        )
    }

  return (
    <main className="form-layout">
        <div className="form-top">
            <p id="form-title">Welcome Back</p>
            <p id="form-subtitle">Please Log In to continue.</p>
        </div>
        <form className="main-form" onSubmit={handleFormSubmit}>
            <div className="form-input">
                <p>Username or Email</p>
                <input type="text"
                       value={identifier}
                       onChange={(e) => (setIdentifier(e.target.value))} 
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
                Log In
            </button>
        </form>
        <div className="form-redirect">
            Don't Have an account ? <Link className="form-redirect-cta" to="/register">Register Now.</Link>
        </div>
    </main>
  )
}

export default LoginForm
