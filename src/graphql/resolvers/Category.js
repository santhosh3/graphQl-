
const productModel = require('../../models/productModel');
const categoryModel = require('../../models/categoryModel');
const reviewModel = require('../../models/reviewModel');


exports.Category = {
    products:async({id},{filter},{productModel,reviewModel}) => {
        const categoryProducts = await productModel.find({categoryId:id, isDeleted:false});
        const reviews = await reviewModel.find({isDeleted:false})
        let filteredCategoryProducts = categoryProducts;
        if(filter){
            const{onSale,avgRating} = filter
            if(onSale){
                filteredCategoryProducts = filteredCategoryProducts.filter((product) => {
                    return product.onSale
                })
            }
            if(avgRating){
                if([1,2,3,4,5].includes(avgRating)){
                    filteredCategoryProducts = filteredCategoryProducts.filter((product) => {
                        let sumRating = 0
                        let numberOfReviews = 0
                        reviews.forEach((review) => {
                            if(review.productId === product.id){
                                sumRating += review.rating;
                                numberOfReviews++
                            }
                        });
                        const avgProductRating = sumRating/numberOfReviews;
                        return avgProductRating >= avgRating
                    })
                }
            }
        }
        return filteredCategoryProducts
    }
}