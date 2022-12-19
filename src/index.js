const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');

const categoryModel = require('./models/categoryModel');
const productModel = require('./models/productModel');
const reviewModel = require('./models/reviewModel');

const URL = "mongodb+srv://santhosh:12345@backend.sx1ylzc.mongodb.net/test"

//Apollo Server
//typeDefs: GraphQL type definations
//resolvers: How do we resolve quries / mutations

const {typeDefs} = require('./graphql/typedefs/typeDefs');
const {Query} = require('./graphql/resolvers/Query');
const {Mutation} = require('./graphql/resolvers/Mutation');
const {Product} = require('./graphql/resolvers/Product');
const {Category} = require('./graphql/resolvers/Category');


const server = new ApolloServer({
    typeDefs,resolvers:{
      Query,Category,Mutation,Product
    },
    context:{
      categoryModel,
      productModel,
      reviewModel
    }
});

mongoose.set('strictQuery', true)
mongoose.connect(URL, {useNewUrlParser:true})
    .then(() => {
        console.log("MongoDB is connected successful");
        return server.listen()
     })
     .then(({url}) => {
      console.log(`server is ready at ${url}`)
})


