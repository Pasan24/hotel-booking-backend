import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
    
    {
        bookingId :{
            type : Number,
            required : true,
            unique : true
        },
        roomId :{

            type :  Number,
            required : true,
            unique : true
        },

        email:{
            required : true,
            type : String
        },
        status :{
            type : String,
            required : true,
            default : "Pending"
        },
        reason:{
            type : String,
            default : ""
        },
        start :{
            type : Date,
            required : true
        },
        end : {
            type:Date,
            required : true

        },

        notes :{
            type : String,
            default : " "
        },
        timestamp:{
            type: Date,
            default: Date.now
          }
        



}


)

const Booking =  mongoose.model("Bookings",bookingSchema)

export default Booking



