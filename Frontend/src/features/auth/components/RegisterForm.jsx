import { Link } from "react-router-dom"

const RegisterForm = () => {

  return (
    <main className="form-layout">
        <div className="form-top">
            <p id="form-title">Get Started Now</p>
            <p id="form-subtitle">Create an account to continue.</p>
        </div>
        <form className="main-form">
            <div className="form-input">
                <p>Username</p>
                <input type="text" />
            </div>
            <div className="form-input">
                <p>Email address</p>
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
            Have an account ? <Link className="form-redirect-cta" to="/login">Log In.</Link>
        </div>
    </main>
  )
}

export default RegisterForm
