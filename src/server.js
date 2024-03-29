import "./env";

import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import { sendSecretMail } from "./utils";

sendSecretMail("kimessu@gmail.com", "2134132");

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema
});

server.express.use(logger("dev"));

server.start({ port: PORT }, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
