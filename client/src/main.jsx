import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserProvider from './contexts/UserContext.jsx'
import PostProvider from './contexts/PostsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PostProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </PostProvider>
  </React.StrictMode>,
)
