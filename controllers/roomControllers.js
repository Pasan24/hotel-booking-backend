import Room from "../models/room";
import { isAdminValid } from "./userControllers";

export function createRoom (req,res){
    if(!isAdminValid(req)){
        res.status(403).json({
            message : "forbidden"
        })
        return
    }


    const newRoom = newRoom (req.body).save().then(
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
                res.satus(404).json({
                    message: "Room not Found"
                
                })
                return
            }else{
                res.json(
                    {
                        message : "Room not found",
                        error : err
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

export function updateRoom(req,res){
    if(!isAdminValid(req)){
        res.status(403).json({
            message :"forbidden"
        })
        return
    }

    const roomId = req.params.roomId

    Room.findByIdAndUpdate({ roomId : roomId},req.body).then(
        ()=>{
            res.json({
                message :"Room updated successfully"
            })
        }
    ).catch(
        ()=>{
            res.jsn({
                message : "Room update failed"
            })

        }

    )


}