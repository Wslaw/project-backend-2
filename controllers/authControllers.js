import bcrypt from "bcrypt";

import * as authServices from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";

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
    
    const token = "123.123.123";

    res.json({
        token,
    })


};

export default { signup, signin };
