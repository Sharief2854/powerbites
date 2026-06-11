

const mongoose = require('mongoose');



const bannerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    offer: {
        type: String,
        required: true
    },
    discount: {
        type: String,
        required: true
    },

    image: {
        type: [String],
        required: true,
        validate: {
            validator: (arr) => arr.length <= 5,
            message: 'A banner cannot have more than 5 images.'
        }
    }

},
    {
        timestamps: true
    }
)


const bannerModel = mongoose.model("banner", bannerSchema)
module.exports = bannerModel  
