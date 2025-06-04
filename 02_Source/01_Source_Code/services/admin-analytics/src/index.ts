import "dotenv/config";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer as startServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./typeDefs.js";

const port = Number(process.env.PORT) || 4000;

const server = new ApolloServer({ typeDefs, resolvers });

startServer(server, { listen: { port } })
  .then(({ url }) => void console.log(`🚀  Server ready at: ${url}`))
  .catch(console.error);
