//first later capital.
//moongoose database ne manage kare.

const mongoose =require('mongoose')
const { Schema } = mongoose;

const ContactSchema = new Schema({

        user:
        {
                type:mongoose.Schema.Types.ObjectId,
                ref:'user'
        },
        name : {
                type: String,
                require:true,
        },
        email : {
                type: String,
                default: "Genral",
        },

        message : {
                type: String,
                require:true,
                
        },

        date : {
                type: Date,
                // jayare form submit thase tayare date call thase
                default:Date.now,
        }


      });

      module.exports =mongoose.model('contact',ContactSchema);