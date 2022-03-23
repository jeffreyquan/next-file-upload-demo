import { ApolloServer } from "apollo-server-micro";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { processRequest } from "graphql-upload";
import { ServerResponse } from "http";
import { schema } from "../../apollo/schema";

const apolloServer = new ApolloServer({ schema });

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = apolloServer.start();

// https://github.com/apollographql/apollo-server/issues/5547#issuecomment-888222372
// https://github.com/jaydenseric/graphql-upload/issues/160#issuecomment-822729490
export default async function handler(req: MicroRequest, res: ServerResponse) {
  await startServer;
  const contentType = req.headers["content-type"];
  if (contentType && contentType.startsWith("multipart/form-data")) {
    req.filePayload = await processRequest(req, res);
  }
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}
