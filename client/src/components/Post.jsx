/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
const Post = ({post, children}) => {
  return (
    <div className="mb-4">
      <div className='flex items-start justify-between'>
        <div>
          <h2 className="home-post">{post.title}</h2>
          <p className="text-[10px] text-slate-500">{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
        <div>{children}</div>
      </div>
      <p className="text-sm">{post.body}</p>
      <div className="home-seperator-line"></div>
    </div>
  )
}

export default Post
