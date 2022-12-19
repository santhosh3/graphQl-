const {Schema,model} = require('mongoose');

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

module.exports = model('Category',categorySchema)