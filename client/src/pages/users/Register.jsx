import { useState,useContext } from "react"
import Alert from "../../components/Alert"
import { registerUser } from "../../controllers/usersControllers"
import { UserContext } from "../../contexts/UserContext"
import { useNavigate } from "react-router-dom"

const Register = () => {
  //use user context
  const { setUser} = useContext(UserContext)
  //use navigate
  const navigate = useNavigate()

  // error state
  const [error, setError] = useState(null)

  //form data state
  const [ formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: ""
  })

  const handleRegister = async(e) => {
    e.preventDefault();
    try {
      await registerUser(formData.email, formData.password, formData.passwordConfirm)
      setUser({email: formData.email, posts: []})
        //navigate dashboard
        navigate('/dashboard')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <section className="card">
      <h1 className="title">Login to your Account</h1>
      <form onSubmit={handleRegister}>
        <input type="email" placeholder="Email Address" className="input" autoFocus value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
        <input type="password" placeholder="Password" className="input" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}/>
        <input type="password" placeholder="Confirm Password" className="input" value={formData.passwordConfirm} onChange={(e) => setFormData({...formData, passwordConfirm: e.target.value})}/>
        <button className="btn">Register</button>
      </form>
      {error && <Alert msg={error}/>}
    </section>
  )
}

export default Register
