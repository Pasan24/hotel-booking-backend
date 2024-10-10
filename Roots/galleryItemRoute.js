import express from "express";
import { createGalleryItem, getGalleryItems } from "../controllers/galleryItemController.js"; // Add getGalleryItems here

const galleryItemRouter = express.Router();

galleryItemRouter.post("/", createGalleryItem);
galleryItemRouter.get("/", getGalleryItems); // Now this will work

export default galleryItemRouter;