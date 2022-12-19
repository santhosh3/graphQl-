const productModel = require('../../models/productModel');
const categoryModel = require('../../models/categoryModel');
const reviewModel = require('../../models/reviewModel');

const mongoose = require('mongoose');

exports.Query = {
    hello: (parent,args,context) => {
        return "Hello World"
    },
    products:async(parent,{filter},context) => {
        try {
            let filteredProducts = await productModel.find({isDeleted:false});
            let reviews = await reviewModel.find();
            if(filter){
            const {onSale,avgRating} = filter
            console.log(onSale)
            if(onSale){
                filteredProducts = filteredProducts.filter((product) => product.onSale);
            }
            if(avgRating){
                if([1,2,3,4,5].includes(avgRating)){
                    filteredProducts = filteredProducts.filter((product) => {
                        let sumRating = 0;
                        let numberOfPeople = 0;
                        reviews.forEach((reviews) => {
                            if(reviews.productId == product.id){
                                sumRating = sumRating + reviews.rating;
                                numberOfPeople++
                            }
                        });
                        const avgProductRating = sumRating / numberOfPeople;
                        return avgProductRating >= avgRating
                    })
                }
            }
        }
        return filteredProducts
        } catch (error) {
          console.log(error);
          return error
        }
    },
    product:async(parent,args,context) => {
        try {
            let productId = args.id;
            if(!mongoose.Types.ObjectId.isValid(productId)){
            return null
            }
           let product = await productModel.findById(productId, {isDeleted:false});
           return (!product)?null:product;
        } catch (error) {
           console.log(error);
           return error
        }
    },
    categories:async(parent,args,context) => {
       try {
         return await categoryModel.find({isDeleted:false});
       } catch (error) {
         console.log(error);
         return error
       }
    },
    category:async(parent,args,context) => {
       try {
         let categoryId = args.id;
         if(!mongoose.Types.ObjectId.isValid(categoryId)){
             return null
         }
         let category = await categoryModel.findOne({_id:categoryId,isDeleted:false});
         console.log(category);
         return category;
       } catch (error) {
         console.log(error);
         return error
       }
    },
}