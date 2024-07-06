/* eslint-disable react/prop-types */
import { useState, createContext } from "react"

export const PostContext = createContext();

const PostProvider = ({children}) => {
  const [posts, setPosts] = useState([])
  return (
    <PostContext.Provider value={{posts, setPosts}}>
      {children}
    </PostContext.Provider>
  )
}

export default PostProvider