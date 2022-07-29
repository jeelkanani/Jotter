const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
        name : {
                type: String,
                require:true,
        },

        email : {
                type: String,
                require:true,
                unique :true,
                
        },

        password : {
                type: String,
                require:true,
        },

        date : {
                type: Date,
                // jayare form submit thase tayare date call thase
                default:Date.now,
        }


      });


//       Schema thi ek model banavi
      const user=mongoose.model('user',UserSchema);
//       user.createIndexes();  //index email mate banti ti bcz te unqiue chhe eni mate alag index na banavay
      module.exports =user;