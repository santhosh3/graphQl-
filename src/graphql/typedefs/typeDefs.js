const {gql} = require('apollo-server');

exports.typeDefs = gql`
    type Query{
        hello: String
        products(filter:ProductFilterInput): [Product!]!
        product(id:ID!): Product
        categories: [Category!]!
        category(id:ID!): Category
    }
    type Product {
        id:ID!
        name: String!
        description: String!
        quantity: String!
        image: String!
        price: Float!
        isDeleted: Boolean
        onSale: Boolean!
        category: Category
        reviews: [Review]
    }
    type Category {
        id:ID!
        name: String!
        products(filter:ProductFilterInput): [Product!]!
    }

    type Review {
        id:ID!
        title: String!
        comment: String!
        date: String
        rating: Int!
        productId: ID
    }

    type Mutation {
        addCategory(input:AddCategoryInput!) : Category!
        addProduct(input:AddProductInput!) : Product
        addReview(input: AddReviewInput!) : Review
        deleteCategory(id:ID!) : Boolean!
        deleteProduct(id:ID!) : Boolean!
        deleteReview(id:ID!) : Boolean!
        updateCategory(id:ID!, input:UpdateCategoryInput) : Category
        updateProduct(id:ID!, input:UpdateProductInput):Product
        updateReview(id:ID!, input:UpdateReviewInput):Review
    }

    input AddCategoryInput {
        name: String!
    }

    input AddProductInput {
        name: String!
        description: String!
        quantity: Int!
        price: Int!
        image: String!
        onSale: Boolean!
        categoryId: ID!
    }

    input AddReviewInput {
        title: String!
        comment: String!
        rating: Int!
        date: String
        productId: ID!
    }

    input UpdateCategoryInput{
        name: String!
    }

    input UpdateProductInput{
         name:String
         description:String
         quantity:Int
         price:Float
         image:String
         onSale:Boolean
         categoryId:String
    }

    input UpdateReviewInput{
        title: String
        comment: String
        rating: Int
        date: String
        productId: ID
    }

    input ProductFilterInput {
        onSale: Boolean
        avgRating: Int
    }
 `