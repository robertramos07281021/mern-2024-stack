/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import { getPosts } from "../../controllers/postsController"
import { PostContext } from "../../contexts/PostsContext"
import Post from "../../components/Post"

const Home = () => {
  const { posts, setPosts} = useContext(PostContext)
  //loading state
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout( async() => {
      const data = await getPosts();
      setPosts(data.posts)
      setLoading(false)
    }, 1000)
  
  },[])


  return (
    <section className="card">
      <h1 className="title">Lastest Posts 1</h1>
      {loading && (
        <i className="fa-solid fa-spinner animate-spin text-3xl text-center block"></i>
      )}

      {posts && posts.map((post) => <div key={post._id}>
        <Post post={post}/>
      </div>)}
    </section>
  )
}

export default Home
