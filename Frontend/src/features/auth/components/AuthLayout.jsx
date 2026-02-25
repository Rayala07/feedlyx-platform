import "../styles/auth.scss"

const AuthLayout = ({children}) => {
  return (
    <main className='auth-page'>
        <div className='auth-layout'>
            <div className='auth-left'>
            </div>
            <div className='auth-right'>
              {children}
            </div>
        </div>
    </main>
  )
}

export default AuthLayout
