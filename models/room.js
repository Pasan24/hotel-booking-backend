import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        roomId : {
            type : Number,
            required : true,
            unique : true
        },

        category : {
            type: String,
            required : true
        },

        maxGuests :{
            type : Number,
            required : true,
            default : 3
        },

        available :{

            type : Boolean,
            required  : true,
            default : true
        },

        photoes :[
            {
                type : String

            }
        ],

        specialDescription : {
            type : String,
            default : " "
        },
        notes : {
            type : String,
            default : " "
        },
        timeStamps: {
            type : Date,
            deafult : Date.now
        }
    }

)

 const Room = mongoose.model("Rooms",roomSchema)

 export default Room