//first later capital.
//moongoose database ne manage kare.

const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({

        user:
        {
                type:mongoose.Schema.Types.ObjectId,
                ref:'user'
        },
        title : {
                type: String,
                require:true,
        },

        description : {
                type: String,
                require:true,
                
        },

        tag : {
                type: String,
                default: "Genral",
        },

        date : {
                type: Date,
                // jayare form submit thase tayare date call thase
                default:Date.now,
        }


      });

      module.exports =mongoose.model('notes',NotesSchema);