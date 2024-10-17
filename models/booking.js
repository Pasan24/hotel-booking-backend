import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
    
    {
        bookingId :{
            required : true,
            unique : true
        },
        roomId :{

            type :  Number,
            required : true
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
        }



}


)



