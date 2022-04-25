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

// https://github.com/idurar/generic-graphql-crud-next-js-mongodb/blob/e48be6d1691163677bf89c1fadbb3bfb212791db/backend/graphql/server/index.ts#L18

export default async function handler(req: MicroRequest, res: ServerResponse) {
  /* cors */
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  const contentType = req.headers["content-type"];
  if (contentType && contentType.startsWith("multipart/form-data")) {
    req.filePayload = await processRequest(req, res);
  }
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}
