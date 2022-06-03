const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({

	userId: {
		type: String,
		required: true
	},
	customerName: { 
		type: String, 
		required: true 
	},
	street: { 
		type: String, 
		required: true 
	},
	city: { 
		type: String, 
		required: true 
	},
	zip: { 
		type: String, 
		required: true 
	},
	phone: { 
		type: String, 
		required: true 
	}

}, { timestamps: true });

module.exports = mongoose.model("address", addressSchema);