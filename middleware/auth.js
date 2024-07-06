import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'


const auth = async(req, res, next)=> {
  const { authorization } = req.headers
  if(!authorization) {
    return res.status(401).json({ error: 'Authorization token not found'})
  }

  const token = authorization.split(" ")[1]

  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findById(id).select("_id");
    next();
  } catch(err) {
    return res.status(500).json({ error: err.message})
  }
}

export default auth