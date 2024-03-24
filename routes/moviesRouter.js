import express from "express";

import moviesControllers from "../controllers/moviesControllers.js";

const moviesRouter = express.Router();

moviesRouter.get("/", moviesControllers.getAll);

moviesRouter.get("/:id", moviesControllers.getById);

// moviesRouter.post("/", moviesControllers.add);

// moviesRouter.put("/:id", moviesControllers.updateById);

// moviesRouter.delete("/:id", moviesControllers.deleteById);

export default moviesRouter;




// ***********************************
// У ментора так

// import { movieAddSchema,movieUpdateSchema } from "../schemas/moviesSchemas";

// moviesRouter.post("/", validateBody(movieAddSchema), moviesControllers.add);

// moviesRouter.put("/:id", validateBody(movieUpdateSchema), moviesControllers.updateById);