import { Link } from "react-router-dom"
const LoginForm = () => {
  return (
    <main className="form-layout">
        <div className="form-top">
            <p id="form-title">Welcome Back</p>
            <p id="form-subtitle">Please Log In to continue.</p>
        </div>
        <form className="main-form">
            <div className="form-input">
                <p>Username or Email</p>
                <input type="text" />
            </div>
            <div className="form-input">
                <p>Password</p>
                <input type="text" />
            </div>

            <button>
                Register
            </button>
        </form>
        <div className="form-redirect">
            Don't Have an account ? <Link className="form-redirect-cta" to="/register">Register Now.</Link>
        </div>
    </main>
  )
}

export default LoginForm
