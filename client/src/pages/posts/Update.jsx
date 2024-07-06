import { useState, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { updatePost } from "../../controllers/postsController"
import { PostContext } from "../../contexts/PostsContext"
import Alert from "../../components/Alert"


const Update = () => {
  const {posts, setPosts} = useContext(PostContext)

  const navigate = useNavigate()

  const {state} = useLocation()
  

  const [error, setError] = useState(null)

  const [title, setTitle] = useState(state.title)
  const [body, setBody] = useState(state.body)

  const handleUpdate =async(e) => {
    e.preventDefault()
  
    try {
      const data = await updatePost(state._id,title, body);
      const updatedPosts = posts.filter((post) => post._id !== state._id)
      setPosts([...updatedPosts, data.post])
      navigate('/dashboard')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <section className="card">
      <h1 className="title">Update your post</h1>
      <form onSubmit={handleUpdate}>
        <input type="text" placeholder="Post Tile" className="input" autoFocus onChange={(e)=> setTitle(e.target.value)} value={title}/>
        <textarea rows={6} className="input" placeholder="Post Content" onChange={(e)=>setBody(e.target.value)} value={body}></textarea>
        <button className="btn">Update</button>
      </form>

      {error && <Alert msg={error}/>}
    </section>
  )
}

export default Update
