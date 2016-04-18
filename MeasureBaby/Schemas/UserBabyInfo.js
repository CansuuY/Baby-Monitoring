var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var babyInfoSchema = new Schema({
	name             : {type : String},
	age              : {type : Number},
	cryDetected      : {type : Boolean},
	movementDetected : {type : Boolean},
    temperature      : { type: Number, min:36 , max:40 },
    heartRate        : { timestamp: String, metric: Number },
    respirationRate  : { timestamp: String, metric: Number }
})

var UserBabyInfo = mongoose.model('babyInfos', babyInfoSchema);
module.exports = UserBabyInfo;