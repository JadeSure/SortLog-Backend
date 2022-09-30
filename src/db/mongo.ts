import User from '../models/User'
import mongoose = require('mongoose');
import * as jwt from 'jsonwebtoken';
export class MongoHelper {
  /**
   * This function returns either true of false based information present in the database
   * @param req
   */
  public async validateUser(req: any) {
    const token = req.headers.authorization || '';
    try {
      const payload = <{ data: string; iat: number }>(
        jwt.verify(token, <string>process.env.auth_encryption_salt)
      );
      const email = payload['data'];
      return await User.find({ email: email }).then((response: any) => {
        if (response.length > 0) {
          return { isUserLogged: true, email: email };
        }
        return { isUserLogged: false };
      });
    } catch (error) {
      return { isUserLogged: false };
    }
  }

  /**
   * This function will initiate the Mongo Database connection
   */
  public initiateMongoConnection(): void {
    (<any>mongoose).Promise = global.Promise;
    mongoose
      .connect(process.env.MONGO_URL || 'mongodb://localhost:27017/YourDB', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then(() => {
        console.log('Connected to MongoDb');
      })
      .catch((err: Error) => {
        throw `There is error in connecting Mongo DB ${err.message}`;
      });
  }
}
