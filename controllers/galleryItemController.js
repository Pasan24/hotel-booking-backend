
import GalleryItem from "../models/galleryItem.js";

export function createGalleryItem(req,res){  //post

    const user = req.user

    if(user == null){

        res.status(403).json({
          message : "Please login to create a gallery item"
        })
        return
      }

      if(user.type!= "admin"){
        res.status(403).json({
          message : "You are not authorized to create  gallery item"
        })
        return


      }

      
    const galleryItem = req.body.item
    const newGalleryItem = new GalleryItem(galleryItem);

    newGalleryItem.save().then(

        ()=>{
            res.json({
                message : "Gallery Item Created !"

            })
        }

    ).catch(
        ()=>{
            res.status(500).json({
                message : "Gallery item creation failed !"
            })
        }
    )

}

export function getGalleryItems(req,res){

    GalleryItem.find().then(
      (list)=>{
        res.json({
          list : list
        })
      }
    )
  }
  
  
  

