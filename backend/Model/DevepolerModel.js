const mongoose = require("mongoose");
const developerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    image: String
});

const DevelpoerModel = mongoose.model("developers", developerSchema);
module.exports=DevelpoerModel;