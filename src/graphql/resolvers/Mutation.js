const categoryModel = require('../../models/categoryModel')
const productModel = require('../../models/productModel');
const reviewModel = require('../../models/reviewModel');
const mongoose = require('mongoose');

exports.Mutation = {
    addCategory: async(parent, {input}, {categoryModel}) => {
        try {
            const {name} = input
            let create = await categoryModel.create(input);
            return (!create)?null:create
        } catch (error) {
            console.error(error);
            return error
        }
    },
    addProduct: async(parent, {input}, {productModel}) => {
        try {
            const {name,description,quantity,price,image,onSale,categoryId} = input;
            if(!mongoose.Types.ObjectId.isValid(categoryId)){
                return null
            }
            let findCategory = await categoryModel.findById(categoryId);
            if(!findCategory) return null
            let postProduct = await productModel.create(input);
            return (!postProduct)?null:postProduct
        } catch (error) {
            console.error(error);
            return error
        }
    },
    addReview: async(parent, {input}, {reviewModel}) => {
       try {
        const {title,comment,rating,date,productId} = input;
        if(!mongoose.Types.ObjectId.isValid(productId)){
            return null
        }
        const postReview = new reviewModel({title,comment,rating,date,productId});
        await postReview.save();
        return postReview;
       } catch (error) {
         console.error(error);
         return error
       }
    },
    deleteCategory: async(parent,{id}, context) => {
        try {
            let categoryDelete = await categoryModel.findByIdAndUpdate(id,{isDeleted: true},{new:true});
            let productDelete = await productModel.updateMany({categoryId:id, isDeleted:false},{isDeleted:true},{new:true});
            return true
        } catch (error) {
            console.error(error);
            return error
        }
    },
    deleteReview: async(parent,{id}, context) => {
        try {
            await reviewModel.findByIdAndUpdate(id,{isDeleted:true},{new:true});
            return true
        } catch (error) {
            console.error(error);
            return error
        }
    },
    deleteProduct: async(parent,{id},context) => {
        try {
            await productModel.findByIdAndUpdate(id, {isDeleted:true},{new:true});
            return true
        } catch (error) {
            console.error(error);
            return error
        }
    },
    updateCategory: async(parent,{id,input},context) => {
        try {
            let findCategory = await categoryModel.findById(id,{isDeleted:false});
            if(!findCategory) return null;
            let {name} = input;
            if(!name) return null
            let updateCat = await categoryModel.findByIdAndUpdate(id, input,{new:true});
            return updateCat
        } catch (error) {
            console.error(error);
            return error
        }
    },
    updateProduct: async(parent,{id,input},{productModel, categoryModel})=>{
       let product = await productModel.findById(id);
       if(!product) return null
       let {name, description, quantity, price, image, onSale, isDeleted, categoryId} = input
       if(categoryId){
        if(!mongoose.Types.ObjectId.isValid(categoryId)){
            return null
        }
        let findCat = await categoryModel.findById(categoryId);
        if(!findCat) return null
       }
       let object = {
           ... product._doc, ... input
       }
       console.log(object)
       let updateProduct = await productModel.findByIdAndUpdate(id, object, {new:true});
       return updateProduct
    },
    updateReview: async(parent, {id,input}, context) => {
        let review = await reviewModel.findById(id);
        if(!review) return null;
        let {title,comment,rating,date,productId} = input
        
        if(productId){
            if(!mongoose.Types.ObjectId.isValid(productId)){
                return null
            }
            let findProduct = await productModel.findById(productId);
            if(findProduct === null) return null
        }

        let object = {
            ... review._doc, ... input
        }
        let updateReview = await reviewModel.findByIdAndUpdate(id, object, {new:true});
        return updateReview
    }
}