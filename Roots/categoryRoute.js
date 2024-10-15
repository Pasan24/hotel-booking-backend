import express from "express";

import { createCategory } from "../controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.post("/",createCategory);

categoryRouter.delete("/:name",(req,res)=>{
    const name = req.params.name     //because here we get name from parameter
    res.json({
        message :name
    })

})


export default categoryRouter;