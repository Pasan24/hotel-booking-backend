import Booking from "../models/booking.js";
import { isCustomerValid } from "./userControllers.js";


export function createBooking(req,res){

    if(!isCustomerValid(req)){
        res.status(403).json({
            message : "Forbidden"
        })
        return
    }

    const startingId =1000;

    Booking.countDocuments({}).then(
        (count)=>{
           console.log(count);

           const newId = startingId+ count + 1;

           const newBooking =new Booking({
                bookingId: newId,
                roomId: req.body.roomId, // Assuming roomId is sent in the request body
                email: req.user.email,     // Assuming email is sent in the request body
                start: req.body.start,      // Assuming start date is sent in the request body
                end: req.body.end,          // Assuming end date is sent in the request body
            

           })
           newBooking.save().then(
            (result)=>{
                res.json({
                    message : "Booking created successfully",
                    result : result 

                }
            
            )

            }

           ).catch(
            (err)=>{
                res.json({
                    message : "booking Creation failed",
                    error : err
                })
            }
           )
        }
    )


}




