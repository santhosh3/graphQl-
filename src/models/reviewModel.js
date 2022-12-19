
const {Schema,model} = require('mongoose');

const reviewSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        trim: true,
        required: true
    },
    date: {
        type: Date,
        trim: true,
        default: Date.now()
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref:'Product',
        trim:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

module.exports = model('Review',reviewSchema)