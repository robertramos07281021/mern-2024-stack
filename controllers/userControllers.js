import User from '../models/UserModel.js'
import bcrypt from 'bcryptjs'
import 'dotenv/config.js'
import jwt from 'jsonwebtoken'

const createToket = (id) => {
  return jwt.sign({id}, process.env.SECRET, {expiresIn: "10d"})
};




const registerUser = async(req, res) => {
  const {email, password} = req.body;

  if(!email || !password) {
    return res.status(400).json({ error: "All fields are required."});
  }

  const exist = await User.findOne({email})
  if(exist) {
    return res.status(400).json({ error: "Email already exists."});
  }
  
  const salt = await bcrypt.genSalt()
  const hashed = await bcrypt.hash(password, salt)

  try {
    const user = await User.create({email, password: hashed});
    const token = createToket(user._id)
    res.status(200).json({email, token})

  } catch (err) {
    res.status(500).json({ error: err.message})
  }
}


const loginUser = async(req, res) => {
  const {email, password} = req.body;

  if(!email || !password) {
    return res.status(400).json({ error: "All fields are required."});
  }

  const user = await User.findOne({email})
  if(!user) {
    return res.status(400).json({ error: "Incorrect email or password."});
  }

  const match = await bcrypt.compare(password, user.password)
  if(!match) {
    return res.status(400).json({ error: "Incorrect email or password."});
  }

  try{
    const token= createToket(user._id)
    res.status(200).json({ email, token})
  } catch (err) {
    res.status(500).json({ error: err.message})
  }
}


export { registerUser, loginUser}