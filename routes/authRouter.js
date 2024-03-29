import express from "express";

import authControllers from "../controllers/authControllers.js";

import { userSigninSchema, userSignupSchema } from "../schemas/usersSchemas.js";

import validateBody from "../helpers/validateBody.js";

const authRouter = express.Router();


authRouter.post("/signup", validateBody(userSignupSchema), authControllers.signup);

authRouter.post("/signin", validateBody(userSigninSchema), authControllers.signin);


export default authRouter;
