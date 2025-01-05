import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    },
    note: {
        type: String,
        default: ""
    }
})

export default mongoose.model("event", eventSchema);