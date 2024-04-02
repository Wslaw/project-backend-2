import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


import * as authServices from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";


const { JWT_SECRET } = process.env;

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authServices.findUser({ email });
    if (user) {
      throw HttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await authServices.signup({ ...req.body, password: hashPassword });
    console.log(newUser);
    res.status(201).json({
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }
  
  const { _id: id } = user;
  const payload = {
    id
  };
      
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn:"23h"});
  console.log(token);
    res.json({
        token,
    })


};

export default { signup, signin };
