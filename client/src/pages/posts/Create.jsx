import { useState, useContext } from "react"
import { createPost } from "../../controllers/postsController"
import Alert from "../../components/Alert"
import { useNavigate } from "react-router-dom"
import { PostContext } from "../../contexts/PostsContext"


const Create = () => {
  const {posts, setPosts} = useContext(PostContext)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleCreate =async(e) => {
    e.preventDefault()
    try {
      const data = await createPost(title, body)
      setPosts([...posts,data.post])
      navigate('/dashboard')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <section className="card">
      <h1 className="title">Create a new post</h1>
      <form onSubmit={handleCreate}>
        <input type="text" placeholder="Post Tile" className="input" autoFocus onChange={(e)=> setTitle(e.target.value)}/>
        <textarea rows={6} className="input" placeholder="Post Content" onChange={(e)=>setBody(e.target.value)}></textarea>
        <button className="btn">Create</button>
      </form>
      
      {error && <Alert msg={error}/>}
    </section>
  )
}

export default Create
