var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var UserSchema = new Schema({

    username: {
        type: "String",
        required: true
    },
    password: {
        type: "String",
        required: true
    },
    highScore: {
        type: "Number",
        default: 0
    },
    }, 
    {
        timestamps: { 
            createdAt: 'created_at' 
        }
});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the Article model
module.exports = User;
