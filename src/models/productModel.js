const {Schema,model} = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        trim: true
    },
    price: {
        type: Number,
    },
    image: {
        type: String,
        trim: true
    },
    onSale: {
        type: Boolean,
        trim: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category', 
        trim: true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

module.exports = model('Product',productSchema)