// import { gql } from 'apollo-server'
const { ApolloServer, gql } = require("apollo-server");
const typeDefs = gql`
//Add more typeDefs based on data to be retrieved
    type Query {
        transactionID: String!
        chainID: String!
        block_number: Int!
        }
    `;
// export default typeDefs
const resolvers = {
    //Add more resolvers based on data to be retrieved
    Query: {
      transactionID: () => "ABCD1234",
      chainID: () => "QWERTY123",
      block_number: () => Math.round(Math.random() * 10),
    },
  };
// Creating an instance
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
server.listen({ port: 8080 }).then(({ url }) => console.log(`GraphQL server running at ${url}`));