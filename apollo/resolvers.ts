import { GraphQLUpload } from "graphql-upload";

type CreateUserArgs = {
  name: string;
  profilePic?: string;
};

export const resolvers = {
  Upload: GraphQLUpload,
  Mutation: {
    createUser(
      _parent: undefined,
      { name, profilePic }: CreateUserArgs,
      _context: any,
      _info: any
    ) {
      console.log({
        name,
        profilePic,
      });
      return {
        id: "123",
        name,
      };
    },
  },
};
