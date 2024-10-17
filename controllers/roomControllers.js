import Room from "../models/room.js";
import { isAdminValid } from "./userControllers.js";

export function createRoom (req,res){
    if(!isAdminValid(req)){
        res.status(403).json({
            message : "forbidden"
        })
        return
    }


    const newRoom = new  Room (req.body);

    newRoom.save().then(
        (result)=>{
            res.json(
                {
                    message :"Room Created Successfully",
                    result : result
                }
            )
        }
    ).catch(
        (err)=>{
            res.json(
                {
                    message : "Rom creation failed",
                    error : err
                }

            )
        }
    )


}


export function deleteRoom(req,res){
    if(!isAdminValid(req)){
        res.status(403).json({
            message : "forbidden"
        })
        return
    }

    const roomId =req.params.roomId
    Room.findOneAndDelete({roomId : roomId}).then(
        ()=>{
            res.json(
                {
                    message : "Room deleted successfully"

                }
            )
        }
    ).catch(
        ()=> {
            res.json(
                {
                    message : "Room delection failed"
                }
            )
        }
    )

}

export function findRoomById(req,res){

    const roomId = req.params.roomId

    Room.findOne({roomId :roomId}).then(
        (result)=>{
            if(result == null){
                res.status(404).json({
                    message: "Room not Found"
                
                })
                return
            }else{
                res.json(
                    {
                        message : "Room found successfully",
                        result : result
                    }
                )
            }
        }
    ).catch(
        (err)=>{
            res.json(
                {
                    message : "Room search failed",
                    error : err
                }
                
            )
        }
    )


}


export function getRooms(req,res){
    Room.find().then(
        (result)=>{
            res.json(
                {
                    rooms : result
                }
            )
        }
    ).catch(
        ()=>{
            res.json(
                {
                    message : "Failed to get rooms"
                }
            )
        }
    )


}

export function updateRoom(req, res) {
    if (!isAdminValid(req)) {
        res.status(403).json({
            message: "forbidden"
        });
        return;
    }

    const roomId = req.params.roomId;

    // Use findOneAndUpdate instead of findByIdAndUpdate
    Room.findOneAndUpdate(
        { roomId: roomId },  // Use the roomId to find the document
        req.body,            // The new data to update the room
        { new: true }        // Option to return the updated document
    ).then((updatedRoom) => {
        if (!updatedRoom) {
            res.status(404).json({
                message: "Room not found"
            });
        } else {
            res.json({
                message: "Room updated successfully",
                updatedRoom: updatedRoom
            });
        }
    }).catch((err) => {
        res.json({
            message: "Room update failed",
            error: err
        });
    });
}


export function getRoomsByCategory(req, res) {
    const category = req.params.category;

    // Use Room to find rooms by category
    Room.find({ category: category }).then((results) => {
        // Check if any results were found
        if (results.length === 0) {
            res.status(404).json({
                message: "No rooms found in this category"
            });
        } else {
            res.json({
                message: "Rooms found in category: " + category,
                rooms: results
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: "Failed to get rooms by category",
            error: err
        });
    });
}
