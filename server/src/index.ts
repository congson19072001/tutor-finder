require('dotenv').config();
import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { User } from './entities/User';
import { Tutor } from './entities/Tutor';
import { Subject } from './entities/Subject';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { UserResolver } from './resolvers/user';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import { COOKIE_NAME, __prod__ } from './constants';
import { MyContext } from './types/MyContext';
import cors from 'cors';
import { TutorResolver } from './resolvers/tutor';
import { SubjectResolver } from './resolvers/subject';
import { SubjectTutor } from './entities/SubjectTutor';
import { Admin } from './entities/Admin';
import { AdminResolver } from './resolvers/admin';
import { buildDataLoaders } from './utils/dataLoaders';
import path from 'path';

const main = async () => {
  const connection = await createConnection({
    type: 'postgres',
    ...(__prod__ ?
      {
        url: process.env.DATABASE_URL,
      }
      : {
      database: 'Beematie',
      username: process.env.DB_USER_DEV,
      password: process.env.DB_PASS_DEV
      }),
    logging: true,
    ...(__prod__ ? {
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      },
      ssl: true
    } : {}),
    ...(__prod__ ? {} : {synchronize: true} ),
    entities: [User, Tutor, Admin, Subject, SubjectTutor],
    migrations: [path.join(__dirname, '/migrations/*')]
  });

  if(__prod__) {
    await connection.runMigrations();
  }

  const app = express();
  app.use(
		cors({
			origin: __prod__
				? process.env.CORS_ORIGIN_PROD
				: process.env.CORS_ORIGIN_DEV,
			credentials: true
		})
	)

  // connect to mongo
  const mongoDBUrl = `mongodb+srv://${process.env.SESSION_DB_USER_DEV_PROD}:${process.env.SESSION_DB_PASS_DEV_PROD}@beematie.hyxqo.mongodb.net/beematie?retryWrites=true&w=majority`;
  await mongoose.connect(mongoDBUrl);
  // session middleware
  app.use(session({
    name: COOKIE_NAME,
    store: MongoStore.create({mongoUrl:mongoDBUrl, collectionName:"sessions"}),
    cookie:{
      maxAge: 60 * 60 * 1000*24, // 1 day in milliseconds
      httpOnly: true, // only send cookie over http
      secure: __prod__ || false, // cookie only works in https
      sameSite: 'lax',  // csrf
      domain: __prod__ ? '.vercel.app' : undefined
    },
    secret: process.env.SESSION_SECRET_DEV_PROD as string || "asdfasdfasdf",
    saveUninitialized: false, // don't create session until something stored
    resave: false, // don't save session if unmodified
  }));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, TutorResolver,SubjectResolver, AdminResolver], 
      validate: false
    }),
    context: ({ req, res }): MyContext => ({ req, res, connection, dataLoaders: buildDataLoaders() }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({app, cors: false});
  const PORT = process.env.PORT || 5000;
  
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}. GraphQL server started on localhost:${PORT}${apolloServer.graphqlPath}`);
  });
};
main().catch((err) => {
  console.log(err);
});