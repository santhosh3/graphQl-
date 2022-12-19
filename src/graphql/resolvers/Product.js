
exports.Product = {
    category:async({categoryId},args,{categoryModel}) => {
       try {
           return await categoryModel.findById(categoryId,{isDeleted:false});
       } catch(error){
           console.log(error);
           return error
       }
    },
    reviews:async({id},args,{reviewModel}) => {
        try {
            return await reviewModel.find({productId:id, isDeleted:false})
        } catch (error) {
            console.log(error);
            return error
        }
    }
}