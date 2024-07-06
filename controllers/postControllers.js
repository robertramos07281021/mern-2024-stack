import mongoose from "mongoose";
import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";

const getPosts = async(req, res) => {
  try {
    const posts = await Post.find()
    res.status(200).json({posts})
  } catch (err) {
        return res.status(500).json({ error :err.message})
  }
}

const getUserPost = async(req, res) => {
  const user = await User.findById(req.user._id)

  try {
    const userPost = await Post.find({user: user._id})
    res.status(200).json({ userPost, email: user.email})
  } catch (err) {
    res.status(500).json({error: err.message})
  }
}

const addPosts = async(req, res) => {
  const {title, body} = req.body

  const user = await User.findById(req.user._id)
  if(!title || !body) {
    return res.status(400).json({mesage :'All fields are required'})
  }
  try {
    const post = await Post.create({ user: user,title, body})
    res.status(200).json({success :'Post created', post})
  } catch (err) {
    return res.status(500).json({ error :err.message})
  }
}

const deletePosts = async(req, res) => {
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error :'Incorrect ID'})
  }
  const post = await Post.findById(id)
  if(!post) {
    return res.status(400).json({ error :'Post not found'})
  }
  const user = await User.findById(req.user._id)
  if(!post.user.equals(user._id)) {
    return res.status(401).json({ error: "Not authorized"})
  }
  
  try {
    await post.deleteOne()
    res.status(200).json({success :'Post deleted'})
  } catch (err) {
    return res.status(500).json({ error :err.message})
  }


}

const updatePosts = async(req, res) => {
  const {id} = req.params;
  const {title, body} = req.body;

  if(!title || !body) {
    return res.status(400).json({mesage :'All fields are required'})
  }
  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error :'Incorrect ID'})
  }

  const post = await Post.findById(id)
  if(!post) {
    return res.status(400).json({ error :'Post not found'})
  }
  const user = await User.findById(req.user._id)
  if(!post.user.equals(user._id)) {
    return res.status(401).json({ error: "Not authorized"})
  }

  try {
    await post.updateOne({title, body})
    res.status(200).json({success :'Post updated', post})
  } catch(err) {
    return res.status(500).json({ error :err.message})
  }


}

export { getPosts, addPosts, deletePosts, updatePosts , getUserPost}

