import {FastifyPluginCallback} from "fastify";
import {
  createUserHandler,
  getUserByIdHandler,
  getUsersHandler,
  loginUserHandler,
  updateUserHandler,
  getUserByEmalAndPasswordHandler,
} from "./controller";
import {$ref} from "../shared";

export const userRoutes: FastifyPluginCallback = (server, _, done) => {
  server.get(
    "/users",
    {
      preHandler: [server.authenticate],
    },
    getUsersHandler
  );

  server.post(
    "/users",
    {
      schema: {
        body: $ref("createUserDto"),
      },
    },
    createUserHandler
  );

  server.get(
    "/users/:uid",
    {
      preHandler: [server.authenticate],
    },
    getUserByIdHandler
  );

  server.post(
    "/users/auth", 
    {
      schema : {
        body: $ref("getAuthUser"),
      },
    },
    getUserByEmalAndPasswordHandler
    );

  server.put(
    "/users",
    {
      schema: {
        body: $ref("updateUserDto"),
      },
    },
    updateUserHandler
  );

  server.post(
    "/users/login",
    {
      schema: {
        body: $ref("loginUserDto"),
      },
    },
    loginUserHandler
  );

  done();
};
