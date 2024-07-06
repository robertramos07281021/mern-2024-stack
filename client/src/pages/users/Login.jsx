import { useContext, useState } from "react"
import Alert from "../../components/Alert"
import { loginUser } from "../../controllers/usersControllers"
import { UserContext } from "../../contexts/UserContext"
import { useNavigate } from "react-router-dom"

const Login = () => {
  //use user context
  const { setUser } = useContext(UserContext)
  //use navigate hooks
  const navigate = useNavigate()


  // error state
  const [error, setError] = useState(null)

  //form data state
  const [ email, setEmail] = useState('')
  const [ password, setPassword] = useState('')
   
  const handleLogin = async(e) => {
    e.preventDefault(); 
    try {
      //login the user
      await loginUser(email, password)
      //update the user state
      setUser({email, posts: []})
      //navigate dashboard
      navigate('/dashboard')
    } catch (error) {
        setError(error.message)
    }
  }

  return (
    <section className="card">
      <h1 className="title">Login to your Account</h1>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email Address" className="input" autoFocus value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" className="input" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button className="btn">Login</button>
      </form>
      {error && <Alert msg={error}/>}
    </section>
  )
}

export default Login
